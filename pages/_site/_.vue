<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <CmsRootComponent v-bind="data" />
    </template>
  </CmsQuery>
</template>

<script>
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import useInternationalizationUrlBuilder from '~/composables/useInternationalizationUrlBuilder'
import { usePageStore, CMS_PAGE } from '~/stores/page'

export default defineComponent({
  layout: 'default',
  setup(props, context) {
    const pageStore = usePageStore()
    const route = useRoute()
    const { buildUrl } = useInternationalizationUrlBuilder(context)

    pageStore.setPageType(CMS_PAGE)
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildUrl(currentPath.value)

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
