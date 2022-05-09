<template>
  <div class="bubble-wrapper">
    <h5>{{ title }}</h5>
    <Richtext :richtext="richtext" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  components: { Richtext },
  props: {
    /**
     * The title of the component
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * richtext element
     */
    richtext: {
      type: String,
      default: '',
    },
    /**
     * The position of the element
     */
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right'].includes(val),
    },
  },
  setup(props) {},
})
</script>

<style lang="scss">
.bubble-wrapper {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-justify-center;
  @apply tw-items-center;
  color: white;
  height: 90px;
  width: 90px;

  @apply tw-rounded-full;
  @apply tw-bg-pv-red;

  @screen md {
    height: 144px;
    width: 144px;
  }

  @screen lg {
    height: 180px;
    width: 180px;
  }

  h5 {
    color: white;
  }
}
</style>
