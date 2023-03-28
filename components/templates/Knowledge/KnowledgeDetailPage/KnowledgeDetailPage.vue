<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slugs.slug"
    :fallback-slug="slugs.fallbackSlug"
    :language="slugs.language"
    :options="{ version }"
  >
    <template #default="{ result: { data, loading } }">
      <LoadingSpinner :show="loading" container-min-height>
        <Page v-if="data" v-bind="data">
          <template #default>
            <ContentWrapper>
              <KnowledgeDetails v-bind="{ content }" />
            </ContentWrapper>
          </template>
        </Page>
      </LoadingSpinner>
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
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import KnowledgeDetails from '~/components/molecules/KnowledgeDetails/KnowledgeDetails'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

export default defineComponent({
  name: 'KnowledgeDetailPage',
  components: {
    Page,
    ContentWrapper,
    KnowledgeDetails,
    LoadingSpinner,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const { version } = useStoryblokVersion()

    console.log('*** version ***', version)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    return { slugs, version }
  },
})
</script>
