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

    <slot name="quicklinks">
      <nuxt-dynamic
        v-for="item in quicklinks"
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
      default: /* istanbul ignore next */ () => {}
    }
  },
  setup (props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs')()
    const defaultFullSlug = inject('getDefaultFullSlug')()
    const { top, header, stage, body, bottom, footer } = useTemplating(content)
    const { getMetaData } = useMeta(content, defaultFullSlug, translatedSlugs, context)

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
  head () {
    return this.metaData
  },
  mounted() {
    console.log(this.quicklinks)
  }
})
</script>
