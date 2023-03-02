<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slugs.slug"
    :fallback-slug="slugs.fallbackSlug"
    :language="slugs.language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data">
        <template #default>
          <ContentWrapper>
            <nuxt-dynamic
              v-for="item in stage"
              :key="item._uid"
              v-editable="item"
              v-bind="item"
              :name="item.uiComponent || item.component"
            />
            <KnowledgeContent />
          </ContentWrapper>
        </template>
      </Page>
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
} from '@nuxtjs/composition-api'
import Page from '~/components/templates/Page/Page'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import useTemplating from '~/composables/useTemplating'
import KnowledgeContent from '~/components/molecules/KnowledgeContent/KnowledgeContent'

export default defineComponent({
  name: 'KnowledgePage',
  components: {
    Page,
    ContentWrapper,
    KnowledgeContent,
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

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const slugs = computed(() => {
      return buildSlugs(route.value.path)
    })

    const { stage } = useTemplating(content)

    return {
      slugs,
      stage,
    }
  },
})
</script>
