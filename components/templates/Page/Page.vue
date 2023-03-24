<template>
  <div
    class="page-template"
    :class="{ 'page-template--min-height': minHeightPage }"
  >
    <!-- TODO this works, but somehow creates errors on the search page -->
    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(content.quicklinks || [])[0]" />
    </slot>
    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in content.stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in content.body"
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
        v-for="item in content.bottom"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </ContentWrapper>
  </div>
</template>

<script>
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  name: 'Page',
  components: {
    ContentWrapper,
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

    return {
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
