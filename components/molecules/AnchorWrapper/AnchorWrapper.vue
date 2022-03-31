<template>
  <div v-bind="{ id }">
    <NuxtDynamic
      v-for="item in content"
      :key="item._uid"
      v-editable="item"
      v-bind="item"
      :component="item.uiComponent || item.component"
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
