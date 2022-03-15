<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="paragraph-section" v-html="richtext"></div>
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
    const richtext = computed(() => props.content?.richtext)

    return { richtext }
  },
})
</script>
