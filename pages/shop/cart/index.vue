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
              <!-- ToDo: remove Placehoder text and insert Cart data -->
              <h1>Current cart:</h1>
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
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Cart',
  components: {
    Page,
    ContentWrapper,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const cartStore = useCartStore()

    const { currentCart } = storeToRefs(cartStore)

    const cartEntries = computed(() => currentCart.value.entries)

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
    }
  },
})
</script>
