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
              <div class="checkout">
                <div class="checkout__header">
                  <ResultHeadline :headline="$t('checkout.summary')" />
                </div>

                <div class="checkout__check-details">
                  {{ $t('checkout.checkDetails') }}
                </div>

                <div class="checkout__article-list">
                  <h3>{{ $t('checkout.articleList') }}</h3>
                </div>

                <CartTable :cart="cartEntries" :edit-mode="false" />

                <div class="checkout__info">
                  <div v-show="!ociBuyer" class="checkout__information">
                    <PriceInformation information-type="price" />
                  </div>

                  <div class="checkout__actions">
                    <div class="checkout__total">
                      <TotalNetInformation :current-cart="currentCart" />
                    </div>

                    <div class="checkout__submit">
                      <Button
                        :href="localePath('shop-checkout')"
                        :label="$t('cart.requestQuotation')"
                        class="checkout__button--submit"
                        variant="primary"
                        icon="mail_outline"
                      />
                    </div>
                  </div>
                </div>
                <div class="checkout__back-button">
                  <!-- TODO: add correct route after implementation -->
                  <Button
                    :href="localePath('shop-categories')"
                    class="checkout__button checkout__button--back"
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

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import Button from '~/components/atoms/Button/Button.vue'
import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation'
import CartTable from '~/components/molecules/CartTable/CartTable'
import Icon from '~/components/atoms/Icon/Icon.vue'

import { storeToRefs } from 'pinia'

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
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const cartStore = useCartStore()
    const userStore = useUserStore()

    const { app } = useContext()
    const { currentCart } = storeToRefs(cartStore)

    const isMobile = app.$breakpoints.isMobile
    const cartEntries = computed(() => currentCart.value.entries)
    const ociBuyer = computed(() => userStore.currentUser?.ociBuyer)

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
      ociBuyer,
    }
  },
})
</script>

<style lang="scss">
.checkout {
  @apply tw-pt-6;

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
