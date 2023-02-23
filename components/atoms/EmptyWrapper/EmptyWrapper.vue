<template>
  <div
    class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center tw-mb-5"
    style="height: 50px"
  >
    <div>Heading</div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'EmptyWrapper',
  props: {
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.empty-wrapper {
}
</style>
