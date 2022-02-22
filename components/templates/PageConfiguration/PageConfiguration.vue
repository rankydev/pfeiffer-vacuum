<template>
  <div
    v-editable="content"
    class="flex flex-col min-h-screen overflow-x-hidden"
  >
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
      <main class="flex-grow z-10 space-y-7 lg:space-y-32 mb-10 lg:mb-32">
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

<script>
export default {
  name: 'PageConfiguration',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup (props) {
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
}
</script>
