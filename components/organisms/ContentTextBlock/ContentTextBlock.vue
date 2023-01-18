<template>
  <div class="content-text-block">
    <Richtext :richtext="enrichedRichtext" />
    <NuxtDynamic
      v-for="item in button"
      :key="item._uid"
      class="content-text-block__button"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
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
    /**
     * button appended to the richtext
     */
    button: {
      type: Array,
      default: () => [],
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

  &__button {
    @apply tw-mt-4;
  }
}
</style>
