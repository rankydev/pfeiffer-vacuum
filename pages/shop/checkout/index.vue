<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slugs.slug"
    :fallback-slug="slugs.fallbackSlug"
    :language="slugs.language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data">
        <template #default>
          <ContentWrapper>
            <LoadingSpinner :show="loading || cartLoading">
              <template v-if="cartEntries">
                <div class="checkout">
                  <div class="checkout__header">
                    <ResultHeadline :headline="$t('checkout.summary')" />
                  </div>

                  <div class="checkout__check-details">
                    {{ $t('checkout.checkDetails') }}
                  </div>

                  <div class="checkout__addresses">
                    <AddressCard
                      :address="deliveryAddress"
                      :headline="$t('checkout.deliveryAddress')"
                      :editable="false"
                      class="checkout__address-item"
                    />
                    <AddressCard
                      :address="userBillingAddress"
                      :headline="$t('checkout.billingAddress')"
                      :is-billing-address="true"
                      :editable="false"
                      class="checkout__address-item"
                    />
                  </div>

                  <div class="checkout__article-list-heading">
                    <h3>{{ $t('checkout.articleList') }}</h3>
                  </div>

                  <CartTable :cart="cartEntries" :edit-mode="false" />

                  <div class="checkout__info">
                    <div v-show="!ociBuyer" class="checkout__information">
                      <PromotionLabel
                        v-for="(promotion, index) in cartPromotions"
                        :key="index"
                        :subline="promotion.description"
                      />
                      <PriceInformation information-type="price" />
                      <PriceInformation information-type="delivery" />
                    </div>

                    <div class="checkout__actions">
                      <div class="checkout__total">
                        <TotalNetInformation :current-cart="currentCart" />
                      </div>

                      <div class="checkout__submit">
                        <Button
                          :label="$t('checkout.completeRequest')"
                          class="checkout__button--submit"
                          variant="primary"
                          icon="mail_outline"
                          @click="placeOrder"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__back-button">
                    <Button
                      :href="localePath('shop-cart')"
                      class="checkout__button checkout__button--back"
                      variant="secondary"
                      shape="plain"
                      :label="$t('checkout.backToCart')"
                      :prepend-icon="true"
                      icon="arrow_back"
                    />
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="checkout__empty">
                  <Icon
                    icon="shopping_cart"
                    class="checkout__empty-icon"
                    size="xxlarge"
                  />
                  <h2 class="checkout__empty-headline">
                    {{ $t('cart.emptyMessage') }}
                  </h2>
                  <Button
                    :href="localePath('shop-categories')"
                    :label="$t('cart.showAllProducts')"
                    class="checkout__button"
                    variant="primary"
                    icon="arrow_forward"
                  />
                </div>
              </template>
            </LoadingSpinner>
          </ContentWrapper>
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  defineComponent,
  useRoute,
  useContext,
  computed,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

import { useLogger } from '~/composables/useLogger'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import Button from '~/components/atoms/Button/Button'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import CartTable from '~/components/molecules/CartTable/CartTable'
import Icon from '~/components/atoms/Icon/Icon'
import AddressCard from '~/components/molecules/AddressCard/AddressCard'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel'

export default defineComponent({
  name: 'Checkout',
  components: {
    Page,
    ContentWrapper,
    ResultHeadline,
    Button,
    PriceInformation,
    TotalNetInformation,
    CartTable,
    Icon,
    AddressCard,
    LoadingSpinner,
    PromotionLabel,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const { logger } = useLogger('checkout')
    const { app } = useContext()
    const cartStore = useCartStore()
    const { currentCart, loading: cartLoading } = storeToRefs(cartStore)
    const userStore = useUserStore()
    const { userBillingAddress } = storeToRefs(userStore)

    const isMobile = app.$breakpoints.isMobile
    const cartEntries = computed(() => currentCart.value?.entries)
    const deliveryAddress = computed(() => currentCart.value?.deliveryAddress)
    const ociBuyer = computed(() => userStore.currentUser?.ociBuyer)

    // when entering the page loading state is already active until mounted is done
    const loading = ref(true)

    onMounted(async () => {
      try {
        // When entering the checkout page we want to grab the default delivery address from user and set as delivery address for cart
        await userStore.loadDeliveryAddresses()
        const defaultDeliveryAddress = userStore.getDefaultDeliveryAddress()

        if (defaultDeliveryAddress) {
          await cartStore.setDeliveryAddress(defaultDeliveryAddress)
          logger.trace('Successfully set default delivery address as cart delivery address.')
        } else {
          logger.warn('did not find a default delivery address. Cannot set cart delivery address.')
        }
      } catch (error) {
        logger.error('could not set delivery address.', error)
      } finally {
        loading.value = false
      }
    })

    const cartPromotions = computed(() => {
      return currentCart.value?.appliedOrderPromotions || []
    })

    const placeOrder = () => {
      console.log('TODO: PLACE ORDER')
    }

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return {
      loading,
      cartLoading,
      cartEntries,
      slugs,
      isMobile,
      currentCart,
      ociBuyer,
      userBillingAddress,
      deliveryAddress,
      cartPromotions,
      placeOrder,
    }
  },
})
</script>

<style lang="scss">
.checkout {
  @apply tw-pt-6;

  &__addresses {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-5;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__address-item {
    @apply tw-flex-1;
  }

  &__check-details {
    @apply tw-text-lg;
    @apply tw-mb-10;
  }

  &__article-list-heading {
    @apply tw-text-2xl;
    @apply tw-mt-8 tw-mb-4;
  }

  &__empty {
    @apply tw-text-center;
    @apply tw-pb-12;
    @apply tw-pt-4;

    &-icon {
      @apply tw-text-pv-red;
    }

    &-headline {
      @apply tw-mb-4;
    }
  }

  &__header {
    @screen md {
      @apply tw-flex tw-justify-between;
    }

    .result-headline__headline {
      @screen lg {
        @apply tw-text-4xl;
      }
    }
  }

  &__buttons {
    @apply tw-flex;
    @apply tw-pb-8;
  }

  &__submit {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-6;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__button {
    &--submit {
      @screen md {
        @apply tw-w-full;
      }
    }

    &--save {
      @screen md {
        @apply tw-mr-8;
      }
    }

    &--back {
      @apply tw-text-pv-red;
      @apply tw-place-self-center;
    }
  }

  &__info {
    @apply tw-my-6;

    @screen md {
      @apply tw-flex tw-justify-between;
      @apply tw-gap-6;
    }
  }

  &__information,
  &__actions {
    @screen md {
      @apply tw-flex-1;
    }
  }

  &__information {
    @apply tw-gap-5;
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-text-sm;
    }

    @screen xl {
      max-width: 789px;
    }
  }

  &__actions {
    @screen xl {
      max-width: 437px;
    }
  }

  &__total {
    @apply tw-my-6;

    @screen md {
      @apply tw-mb-8 tw-mt-0;
    }

    .price__total {
      @apply tw-text-lg;
    }

    .price {
      @apply tw-py-4;
    }
  }

  &__back-button {
    @apply tw-text-center;

    @screen md {
      @apply tw-text-left;
    }
  }
}
</style>
