<template>
  <div class="bubble-wrapper">
    <div>Hallo Bubble</div>
    <h2>{{ title }}</h2>
    <h2>{{ richtext }}</h2>
    <!-- <circle cx="170" cy="200" r="160" fill="ivory" stroke="orange" /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
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
  setup(props) {
    // return {
    //   title,
    //   richtext,
    //   position,
    // }
  },
})
</script>

<style lang="scss">
.bubble-wrapper {
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

  h2 {
    color: white;
  }
}
</style>
