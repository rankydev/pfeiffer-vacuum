<template>
  <div class="page-template">
    <slot name="header">
      <nuxt-dynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <nuxt-dynamic
        v-for="item in header"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>

    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(quicklinks || [])[0]" />
    </slot>

    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in body"
            :key="item._uid"
            v-editable="item"
            v-bind="item"
            :name="item.uiComponent || item.component"
          />
        </ContentWrapper>
      </main>
    </slot>

    <slot name="footer">
      <ContentWrapper>
        <nuxt-dynamic
          v-for="item in bottom"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </ContentWrapper>

      <nuxt-dynamic
        v-for="item in footer"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>
  </div>
</template>

<script>
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'

export default defineComponent({
  name: 'Page',
  components: {
    ContentWrapper,
    OnPageNavigation,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => {},
    },
  },
  setup(props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { top, header, stage, body, bottom, footer } = useTemplating(content)
    const { getMetaData } = useMeta(
      content,
      defaultFullSlug,
      translatedSlugs,
      context
    )

    return {
      top,
      header,
      stage,
      body,
      bottom,
      footer,
      quicklinks: content.value.quicklinks,
      metaData: getMetaData(),
    }
  },
  head() {
    return this.metaData
  },
})
</script>

<style lang="scss">
.page-template {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-min-h-screen;
  @apply tw-overflow-x-hidden;
}
</style>
