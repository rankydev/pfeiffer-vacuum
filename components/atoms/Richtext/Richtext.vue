<template>
  <div v-editable="content" class="paragraph-section" v-html="paragraph"></div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const paragraph = computed(() => props.content.paragraph)

    return { paragraph }
  },
})
</script>
