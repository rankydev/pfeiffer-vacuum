<template>
  <div v-editable="content" class="paragraph-section">
    <div v-html="paragraph"></div>
  </div>
</template>

<script setup>
import { computed } from '@nuxtjs/composition-api'

const props = defineProps({
  content: {
    type: Object,
    default: () => {},
  },
})

const paragraph = computed(() => props.content.paragraph)
</script>
