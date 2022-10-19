<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <CmsRootComponent v-if="data" v-bind="data" />
    </template>
  </CmsQuery>
</template>

<script>
import {
  useRoute,
  defineComponent,
  onBeforeMount,
  watch,
  onServerPrefetch,
  useContext,
  ssrRef,
} from '@nuxtjs/composition-api'
import { useCategoryStore } from '~/stores/category/category'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, CATEGORY_PAGE } from '~/stores/page'
import { useLogger } from '~/composables/useLogger.js'

export default defineComponent({
  name: 'CategoryShopPage',
  layout: 'default',
  setup() {
    const route = useRoute()
    const context = useContext()
    const { logger } = useLogger()

    /**
     * Set the type of the pages, enabling components
     * like the breadcrumb to retrieve the correct data
     */
    const pageStore = usePageStore()
    pageStore.setPageType(CATEGORY_PAGE)

    /**
     * Load the category data on each route change
     * Redirects to the error page if category was not found
     */
    const catgeoryStore = useCategoryStore()
    const hasError = ssrRef(false)

    const show404 = (error) =>
      context.error({ statusCode: 404, message: error && error.message })

    const loadCategory = async () => {
      try {
        await catgeoryStore.loadByPath()
      } catch (error) {
        logger.error(error)

        if (process.server) {
          context.res.statusCode = 404
          hasError.value = error
        } else {
          show404(error)
        }
      }
    }

    onServerPrefetch(loadCategory)
    onBeforeMount(() => hasError.value && show404(hasError.value))
    onBeforeMount(loadCategory)
    watch(route, loadCategory)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const path = context.app.localePath('shop-categories')
    const { slug, fallbackSlug, language } = buildSlugs(path)

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
