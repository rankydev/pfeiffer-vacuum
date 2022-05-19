<template>
  <div>
    <GenericCard :href="t" :image-size="cover" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {
    /**
     * productID that specifies Product Card
     */
    productID: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss"></style>
