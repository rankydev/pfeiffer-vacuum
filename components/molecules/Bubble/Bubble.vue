<template>
  <div>Hallo Bubble</div>
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
  setup(props) {},
})
</script>

<style lang="scss"></style>
