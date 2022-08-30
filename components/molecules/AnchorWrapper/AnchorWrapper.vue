<template>
  <div v-bind="{ id }">
    <NuxtDynamic
      v-for="item in content"
      :key="item._uid"
      v-editable="item"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
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
})
</script>
