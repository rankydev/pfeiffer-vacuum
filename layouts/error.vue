<template>
  <div>
    <CmsQuery
      :handle-preview-events="true"
      :slug="slug"
      :fallback-slug="fallbackSlug"
      :language="language"
    >
      <template #default="{ result: { data, loading } }">
        <LoadingSpinner :show="loading" container-min-height>
          <CmsRootComponent v-bind="data" />
        </LoadingSpinner>
      </template>
    </CmsQuery>
  </div>
</template>

<script>
import { defineComponent, toRefs, useContext } from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

export default defineComponent({
  components: {
    LoadingSpinner,
  },
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
    }
  },
})
</script>
