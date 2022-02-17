<template>
  <h1>{{ content.text }}</h1>
</template>

<script lang="js">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Title',
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
  }
})
</script>
