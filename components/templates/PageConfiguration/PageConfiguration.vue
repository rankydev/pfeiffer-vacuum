<template>
  <div v-editable="content">
    <slot name="header">
      <NuxtDynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <NuxtDynamic
        v-for="item in header"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>

    <slot>
      <main>
        <NuxtDynamic
          v-for="item in stage"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
        <NuxtDynamic
          v-for="item in body"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </main>
    </slot>

    <slot name="footer">
      <NuxtDynamic
        v-for="item in bottom"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <NuxtDynamic
        v-for="item in footer"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>
  </div>
</template>

<script>
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
    const { top, header, stage, body, bottom, footer } = content.value
    return {
      top,
      header,
      stage,
      body,
      bottom,
      footer,
    }
  },
})
</script>
