<template>
  <div
    class="page-template"
    :class="{ 'page-template--min-height': minHeightPage }"
  >
    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(mergedPageContent.quicklinks || [])[0]" />
    </slot>
    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in mergedPageContent.stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in mergedPageContent.body"
            :key="item._uid"
            v-editable="item"
            v-bind="item"
            :name="item.uiComponent || item.component"
          />
        </ContentWrapper>
      </main>
    </slot>
    <ContentWrapper>
      <nuxt-dynamic
        v-for="item in mergedPageContent.bottom"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </ContentWrapper>
    <!-- TODO: Maybe find better solution to fix hydration -->
    <client-only>
      <StickyBar v-bind="mergedPageContent.stickyBar">
        <slot name="stickyBar" />
      </StickyBar>
    </client-only>
  </div>
</template>

<script>
import {
  defineComponent,
  inject,
  toRefs,
  onMounted,
} from '@nuxtjs/composition-api'
import { usePageStore } from '~/stores/page'
import { storeToRefs } from 'pinia'
import useMeta from '~/composables/useMeta'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import StickyBar from '~/components/atoms/StickyBar/StickyBar'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'

export default defineComponent({
  name: 'Page',
  components: {
    ContentWrapper,
    StickyBar,
    OnPageNavigation,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    metaData: {
      type: Object,
      default: null,
    },
    minHeightPage: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { content, metaData } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { getMetaData } = useMeta(
      metaData.value || content.value,
      defaultFullSlug,
      translatedSlugs
    )

    const pageStore = usePageStore()
    const { mergedPageContent } = storeToRefs(pageStore)

    onMounted(() => {
      pageStore.setPageContent(content.value)
    })

    return {
      mergedPageContent,
      head: getMetaData(),
    }
  },
  head() {
    return this.head
  },
})
</script>

<style lang="scss">
.page-template {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-overflow-x-hidden;

  &--min-height {
    @apply tw-min-h-screen;
  }
}
</style>
