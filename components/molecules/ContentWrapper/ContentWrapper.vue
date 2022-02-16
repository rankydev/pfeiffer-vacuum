<template>
  <div v-editable="content" class="content-wrapper">
    <NuxtDynamic
      v-for="item in content.items"
      :key="item._uid"
      v-editable="true"
      :name="item.component"
      :content="item"
    />
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    default: () => {},
    required: true,
  },
})
</script>
