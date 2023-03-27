<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
    :options="{ version }"
  >
    <template #default="{ result: { data, loading } }">
      <LoadingSpinner :show="loading" container-min-height>
        <CmsRootComponent v-if="data" v-bind="data" />
      </LoadingSpinner>
    </template>
  </CmsQuery>
</template>

<script>
import { defineComponent, ref, toRefs, useRoute } from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, CMS_PAGE } from '~/stores/page'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

export default defineComponent({
  name: 'Default',
  components: {
    LoadingSpinner,
  },
  layout: 'default',
  setup(_, context) {
    const pageStore = usePageStore()
    const route = useRoute()
    const { buildSlugs } = useStoryblokSlugBuilder(context)
    const { version } = toRefs(useStoryblokVersion())

    pageStore.setPageType(CMS_PAGE)
    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildSlugs(currentPath.value)

    return {
      slug,
      fallbackSlug,
      language,
      version,
    }
  },
})
</script>
