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
                  :result-count="cartEntriesCount"
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
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Cart',
  components: {
    Page,
    ContentWrapper,
    ResultHeadline,
    Button,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const cartStore = useCartStore()

    const { app } = useContext()
    const { currentCart } = storeToRefs(cartStore)

    const isMobile = app.$breakpoints.isMobile
    const cartEntries = computed(() => currentCart.value.entries)
    const cartEntriesCount = computed(
      () => currentCart.value.entries?.length || null
    )

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return {
      cartEntries,
      cartEntriesCount,
      slugs,
      isMobile,
    }
  },
})
</script>

<style lang="scss">
.cart-page {
  @apply tw-py-6;

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

  &__button {
    &--save {
      @screen md {
        @apply tw-mr-8;
      }
    }
  }
}
</style>
