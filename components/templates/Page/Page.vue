<template>
  <div>
    <slot name="header">
      <nuxt-dynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        :name="item.uiComponent || item.component"
        v-bind="item"
      />

      <nuxt-dynamic
        v-for="item in header"
        :key="item._uid"
        v-editable="item"
        :name="item.uiComponent || item.component"
        v-bind="item"
      />
    </slot>

    <slot>
      <main>
        <nuxt-dynamic
          v-for="item in stage"
          :key="item._uid"
          v-editable="item"
          :name="item.uiComponent || item.component"
          v-bind="item"
        />
        <nuxt-dynamic
          v-for="item in body"
          :key="item._uid"
          v-editable="item"
          :name="item.uiComponent || item.component"
          v-bind="item"
        />
      </main>
    </slot>

    <slot name="footer">
      <nuxt-dynamic
        v-for="item in bottom"
        :key="item._uid"
        v-editable="item"
        :name="item.uiComponent || item.component"
        v-bind="item"
      />

      <nuxt-dynamic
        v-for="item in footer"
        :key="item._uid"
        v-editable="item"
        :name="item.uiComponent || item.component"
        v-bind="item"
      />
    </slot>
  </div>
</template>

<script lang="js">
import { defineComponent, inject, toRefs } from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'

export default defineComponent({
  name: 'Page',
    inject: [
    'getTranslatedSlugs',
    'getDefaultFullSlug'
  ],

  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs')()
    const defaultFullSlug = inject('getDefaultFullSlug')()
    const { top, stage, header, body, bottom, footer } = useTemplating(content)
    const { getMetaData } = useMeta(content, defaultFullSlug, translatedSlugs, context)

    return {
      top,
      stage,
      header,
      body,
      bottom,
      footer,
      metaData: getMetaData(),
    }
  },
  head () {
    return this.metaData
  },
})
</script>
