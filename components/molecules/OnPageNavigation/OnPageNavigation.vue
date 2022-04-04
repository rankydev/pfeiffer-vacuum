<template>
  <ContentWrapper class="on-page-navigation">
    <!-- TODO: Breadcrumb -->
    <div>[Breadcrumb]</div>
    <QuicklinkNavigation v-bind="{ quicklinks }" />
  </ContentWrapper>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import QuicklinkNavigation from '~/components/molecules/QuicklinkNavigation/QuicklinkNavigation'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'

export default defineComponent({
  components: {
    QuicklinkNavigation,
    ContentWrapper,
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
  @apply tw-items-center tw-justify-between;
  @apply tw-my-4;
  @apply tw-hidden;

  @screen md {
    @apply tw-flex;
  }
}
</style>
