<template>
  <div>
    <CmsQuery
      :handle-preview-events="true"
      :slug="slug"
      :fallback-slug="fallbackSlug"
      :language="language"
      :options="{ version }"
    >
      <template #default="{ result: { data } }">
        <CmsRootComponent v-if="data" v-bind="data" />
      </template>
    </CmsQuery>
  </div>
</template>

<script>
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

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
    const { app } = useContext()
    const locale = app?.i18n.locale
    const { version } = useStoryblokVersion()

    const { error } = toRefs(props)
    const statusCode = error?.value?.statusCode || 404
    let path = '/errors/error'
    if (statusCode === 404) {
      path = `${locale}/errors/404`
    }
    const { buildSlugs } = useStoryblokSlugBuilder(context)
    const { slug, fallbackSlug, language } = buildSlugs(path)

    return {
      slug,
      fallbackSlug,
      language,
      version,
    }
  },
})
</script>
