<template>
  <div class="page-template">
    <slot name="header">
      <nuxt-dynamic
        v-for="item in header"
        v-bind="item"
        :key="item._uid"
        :component="item.uiComponent || item.component"
      />
    </slot>

    <slot name="quicklinks">
      <nuxt-dynamic
        v-for="item in quicklinks"
        v-bind="item"
        :key="item._uid"
        v-editable="item"
        :component="item.uiComponent || item.component"
      />
    </slot>

    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in stage"
          v-bind="item"
          :key="item._uid"
          v-editable="item"
          :component="item.uiComponent || item.component"
        />
        <ContentWrapper>
          <nuxt-dynamic
            v-for="item in body"
            v-bind="item"
            :key="item._uid"
            v-editable="item"
            :component="item.uiComponent || item.component"
          />
        </ContentWrapper>
      </main>
    </slot>

    <slot name="footer">
      <nuxt-dynamic
        v-for="item in footer"
        v-bind="item"
        :key="item._uid"
        :component="item.uiComponent || item.component"
      />
    </slot>
  </div>
</template>

<script lang="js">
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  name: 'ProductContentPage',
  components: {
    ContentWrapper,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => {}
    }
  },
  setup (props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { header, stage, body, footer } = useTemplating(content)
    const { getMetaData } = useMeta(content, defaultFullSlug, translatedSlugs, context)

    return {
      header,
      stage,
      body,
      footer,
      quicklinks: content.value.quicklinks,
      metaData: getMetaData(),
    }
  },
  head () {
    return this.metaData
  },
})
</script>

<style lang="scss">
.page-template {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-h-screen;
}
</style>
