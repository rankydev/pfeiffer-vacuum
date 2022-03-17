<template>
  <div v-editable="content">
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
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'PageConfiguration',
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup(props) {
    const { content } = toRefs(props)
    const { top, stage, header, body, bottom, footer } = content.value
    return {
      top,
      stage,
      header,
      body,
      bottom,
      footer,
    }
  },
})
</script>
