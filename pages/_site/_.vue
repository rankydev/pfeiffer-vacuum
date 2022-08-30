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
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, CMS_PAGE } from '~/stores/page'

export default defineComponent({
  layout: 'default',
  setup(_, context) {
    const pageStore = usePageStore()
    const route = useRoute()
    const { buildSlugs } = useStoryblokSlugBuilder(context)

    pageStore.setPageType(CMS_PAGE)
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildSlugs(currentPath.value)

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
