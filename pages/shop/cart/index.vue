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
              <h1>Cart Template</h1>
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

import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

export default defineComponent({
  name: 'Cart',
  components: {
    Page,
    ContentWrapper,
  },
  setup() {
    const route = useRoute()
    const context = useContext()

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return {
      slugs,
    }
  },
})
</script>
