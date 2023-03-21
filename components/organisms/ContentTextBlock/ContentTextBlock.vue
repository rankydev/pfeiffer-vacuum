<template>
  <div class="content-text-block">
    <Richtext :richtext="enrichedRichtext" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  name: 'ContentTextBlock',
  components: { Richtext },
  props: {
    /**
     * richtext element
     */
    text: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const enrichedRichtext = computed(() => props.text)
    return { enrichedRichtext }
  },
})
</script>

<style lang="scss">
.content-text-block {
  @apply tw-my-16;
}
</style>
