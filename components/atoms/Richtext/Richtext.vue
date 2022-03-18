<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-editable="richtext" class="paragraph-section" v-html="richtext"></div>
</template>
<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    richtext: {
      type: String,
      default: '',
    },
  },
})
</script>
