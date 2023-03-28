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
              <nuxt-dynamic
                v-for="item in enrichedStage"
                :key="item._uid"
                v-editable="item"
                v-bind="item"
                :name="item.uiComponent || item.component"
              />
              <KnowledgeContent />
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
  toRefs,
  unref,
} from '@nuxtjs/composition-api'
import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import useTemplating from '~/composables/useTemplating'
import KnowledgeContent from '~/components/molecules/KnowledgeContent/KnowledgeContent'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import { useStoryblokVersion } from '~/composables/useStoryblokVersion'

export default defineComponent({
  name: 'KnowledgePage',
  components: {
    Page,
    ContentWrapper,
    KnowledgeContent,
    LoadingSpinner,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup(props) {
    const { content } = toRefs(props)
    const route = useRoute()
    const context = useContext()
    const { i18n } = context
    const { version } = useStoryblokVersion()

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    const { stage } = useTemplating(content)

    // TODO: needs to be adapted and deleted as soon as the buttons have the possibility to add an anchor link
    const enrichedStage = computed(() => {
      const newStage = unref(stage) || []
      if (
        newStage[0]?.stageContent?.[0]?.buttons?.[0]?.href &&
        route.value.path === `/${i18n.locale}/knowledge`
      ) {
        delete newStage[0].stageContent[0].buttons[0].href
        newStage[0].stageContent[0].buttons[0].anchor = '#knowledge-results'
      }

      return newStage
    })

    return {
      slugs,
      stage,
      enrichedStage,
      version,
    }
  },
})
</script>
