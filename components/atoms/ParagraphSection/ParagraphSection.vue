<template>
  <div class="paragraph-section">
    <div v-html="paragraph"></div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'ParagraphSection',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const paragraph = computed(() => props.content.paragraph)

    return {
      paragraph,
    }
  },
}
</script>
