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
            <template v-if="cartEntries">
              <div class="cart-page">
                <div class="cart-page__request-info">
                  <GlobalMessage
                    v-if="checkoutButtonDisabled"
                    :description="
                      $t(
                        `myaccount.userStatus.${userStatusTypeForInfoText}.requestInfo`
                      )
                    "
                    variant="warning"
                    :prevent-icon-change="true"
                  />
                </div>

                <div class="cart-page__header">
                  <ResultHeadline
                    :headline="$t('cart.headline')"
                    :result-count="currentCart.totalItems"
                  />

                  <div class="cart-page__buttons">
                    <!-- TODO: add correct route after shopping list implementation -->
                    <Button
                      class="cart-page__button--save"
                      variant="secondary"
                      :label="$t('cart.saveCartToList')"
                      icon="assignment"
                    />

                    <Button
                      v-show="!isMobile"
                      class="cart-page__button"
                      variant="secondary"
                      shape="outlined"
                      :inverted="true"
                      :label="$t('cart.getProductHelp')"
                      icon="help"
                      :href="localePath('/contact')"
                    />
                  </div>
                </div>

                <CartTable :cart="cartEntries" />

                <div class="cart-page__info">
                  <div v-show="!ociBuyer" class="cart-page__information">
                    <PromotionLabel
                      v-for="(promotion, index) in cartPromotions"
                      :key="index"
                      :subline="promotion.description"
                    />
                    <client-only>
                      <PriceInformation
                        v-if="!isMobile"
                        information-type="price"
                      />
                    </client-only>
                  </div>

                  <div class="cart-page__actions">
                    <div class="cart-page__total">
                      <TotalNetInformation :current-cart="currentCart" />
                    </div>

                    <div class="cart-page__submit">
                      <Button
                        :label="$t('cart.requestQuote')"
                        class="cart-page__button--submit"
                        variant="primary"
                        icon="mail_outline"
                        :disabled="checkoutButtonDisabled"
                        @click="handleCheckoutClick"
                      />
                    </div>
                  </div>
                </div>
                <div class="cart-page__back-button">
                  <!-- TODO: add correct route after implementation -->
                  <Button
                    :href="localePath('shop-categories')"
                    class="cart-page__button cart-page__button--back"
                    variant="secondary"
                    shape="plain"
                    :label="$t('cart.continueShopping')"
                    :prepend-icon="true"
                    icon="arrow_back"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="cart-page__empty">
                <Icon
                  icon="shopping_cart"
                  class="cart-page__empty-icon"
                  size="xxlarge"
                />
                <h2 class="cart-page__empty-headline">
                  {{ $t('cart.emptyMessage') }}
                </h2>
                <Button
                  :href="localePath('shop-categories')"
                  :label="$t('cart.showAllProducts')"
                  class="cart-page__button"
                  variant="primary"
                  icon="arrow_forward"
                />
              </div>
            </template>
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
} from '@nuxtjs/composition-api'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { usePageStore, CMS_PAGE } from '~/stores/page'
import { storeToRefs } from 'pinia'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import Button from '~/components/atoms/Button/Button.vue'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import CartTable from '~/components/molecules/CartTable/CartTable'
import Icon from '~/components/atoms/Icon/Icon.vue'
import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'

export default defineComponent({
  name: 'Cart',
  components: {
    Page,
    ContentWrapper,
    ResultHeadline,
    Button,
    PriceInformation,
    TotalNetInformation,
    CartTable,
    Icon,
    PromotionLabel,
    GlobalMessage,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const cartStore = useCartStore()
    const userStore = useUserStore()
    const { isLoggedIn, isApprovedUser, userStatusTypeForInfoText } =
      storeToRefs(userStore)
    const { app } = useContext()
    const { currentCart } = storeToRefs(cartStore)

    const isMobile = app.$breakpoints.isMobile
    const cartEntries = computed(() => currentCart.value.entries)
    const ociBuyer = computed(() => userStore.currentUser?.ociBuyer)
    const cartPromotions = computed(() => {
      return currentCart.value?.appliedOrderPromotions || []
    })
    const checkoutButtonDisabled = computed(() => {
      return isLoggedIn.value && !isApprovedUser.value
    })
    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    const pageStore = usePageStore()
    pageStore.setPageType(CMS_PAGE)

    return {
      cartEntries,
      slugs,
      isMobile,
      currentCart,
      ociBuyer,
      cartPromotions,
      checkoutButtonDisabled,
      userStatusTypeForInfoText,
      handleCheckoutClick: cartStore.handleCheckoutClick,
    }
  },
})
</script>

<style lang="scss">
.cart-page {
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

  &__request-info {
    @apply tw-mb-8;
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
    .promotion-label {
      @apply tw-mb-4;
    }

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
