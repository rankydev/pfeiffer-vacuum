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

export default defineComponent({
  layout: 'default',
  setup(props, context) {
    const route = useRoute()
    const { buildUrl } = useInternationalizationUrlBuilder(context)

    const currentPath = ref(route.value.path)
    const { slug, fallbackSlug, language } = buildUrl(currentPath.value)

    console.log('currentPath', currentPath)
    console.log('slug', slug)
    console.log('fallbackSlug', fallbackSlug)
    console.log('language', language)
    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
