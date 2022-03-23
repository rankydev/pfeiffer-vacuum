<template>
  <div v-bind="{ id }">
    <nuxt-dynamic
      v-for="item in content"
      :key="item._uid"
      v-editable="item"
      :name="item.uiComponent || item.component"
      v-bind="item"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
