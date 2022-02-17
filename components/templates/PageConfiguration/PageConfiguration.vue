<template>
  <div
    v-editable="content"
    class="flex flex-col min-h-screen overflow-x-hidden"
  >
    <slot name="header">
      <div class="flex-grow screen-margin">
        <component
          :is="item.component"
          v-for="item in content.header"
          :key="item._uid"
          v-editable="item"
          :content="item"
        />
      </div>
    </slot>

    <slot name="footer">
      <div class="flex-grow screen-margin">
        <component
          :is="item.component"
          v-for="item in content.footer"
          :key="item._uid"
          v-editable="item"
          :content="item"
        />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'PageConfiguration',
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
