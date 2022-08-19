<template>
  <div>
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
  </div>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

export default defineComponent({
  layout: 'default',
  props: {
    error: {
      type: Object,
      required: false,
      default: undefined,
    },
  },
  setup(props, context) {
    const { error } = toRefs(props)
    const statusCode = error?.value?.statusCode || 404
    let path = '/errors/error'
    if (statusCode === 404) {
      path = `/errors/404`
    }
    const { buildSlugs } = useStoryblokSlugBuilder(context)
    const { slug, fallbackSlug, language } = buildSlugs(path)

    return {
      slug,
      fallbackSlug,
      language,
    }
  },
})
</script>
