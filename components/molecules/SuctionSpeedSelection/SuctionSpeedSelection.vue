<template>
  <div>Hallo Welt</div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SuctionSpeedSelection',
  components: {},
  props: {
    value: {
      type: null,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
