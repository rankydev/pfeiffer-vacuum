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
            <div class="cart-page">
              <div class="cart-page__header">
                <ResultHeadline
                  :headline="$t('cart.headline')"
                  :result-count="currentCart.totalItems"
                />

                <div class="cart-page__buttons">
                  <Button
                    class="cart-page__button cart-page__button--save"
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
                  />
                </div>
              </div>
              <ul>
                <li v-for="(entry, index) in cartEntries" :key="index">
                  <b> Name: </b>
                  {{ entry.product.name }}
                  <b> Quantity: </b>
                  {{ entry.quantity }}
                </li>
              </ul>

              <div class="cart-page__information">
                <PriceInformation :current-cart="cart" />
                <!-- REMOVE COMPUTED PROPERTY CART -->
              </div>

              <div class="cart-page__total">
                <TotalNetInformation :current-cart="currentCart" />
              </div>

              <div class="cart-page__submit">
                <Button
                  class="cart-page__button"
                  variant="primary"
                  label="Submit your request"
                  icon="mail_outline"
                />

                <Button
                  v-show="isMobile"
                  class="cart-page__button cart-page__button--back"
                  variant="secondary"
                  shape="plain"
                  label="Back to shopping cart"
                  icon="arrow_back"
                  prepend-icon="true"
                />
              </div>
            </div>
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

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import Button from '~/components/atoms/Button/Button.vue'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'

import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Cart',
  components: {
    Page,
    ContentWrapper,
    ResultHeadline,
    Button,
    PriceInformation,
    TotalNetInformation,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const cartStore = useCartStore()

    const { app } = useContext()
    const { currentCart } = storeToRefs(cartStore)

    const isMobile = app.$breakpoints.isMobile
    const cartEntries = computed(() => currentCart.value.entries)
    const cart = computed(() => ({
      ...currentCart.value,
      ...currentCartSpecificPrices,
    }))

    const currentCartSpecificPrices = {
      hiddenUIElements: {
        checkoutInformationSpecificPrices: false,
        checkoutInformationDelivery: true,
      },
    }

    const helpContainerContent = {
      headline: 'test',
    }

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return {
      cartEntries,
      slugs,
      isMobile,
      currentCart,
      cart,
    }
  },
})
</script>

<style lang="scss">
.cart-page {
  @apply tw-pt-6;

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
      place-self: center;
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
