<template>
  <div class="content-text-block__richtext">
    <Richtext :richtext="enrichedRichtext" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
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
.content-text-block__richtext {
  @apply tw-py-24;
}
</style>
