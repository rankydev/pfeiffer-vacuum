<template>
  <div class="on-page-navigation">
    <!-- TODO: Breadcrumb -->
    <div>[Breadcrumb]</div>
    <QuicklinkNavigation v-bind="{ quicklinks }" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuicklinkNavigation from '~/components/molecules/QuicklinkNavigation/QuicklinkNavigation'

export default defineComponent({
  components: {
    QuicklinkNavigation,
  },
  props: {
    quicklinks: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.on-page-navigation {
  @apply tw-container;
  @apply tw-flex tw-items-center tw-justify-between;
}
</style>
