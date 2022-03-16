<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="paragraph-section" v-html="richtext"></div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    richtext: {
      type: String,
      default: '',
    },
  },
  setup(props) {},
})
</script>
