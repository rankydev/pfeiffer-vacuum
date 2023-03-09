<template>
  <div
    class="error-handling"
    :class="{ 'error-handling--grey-bg': greyBackground }"
  >
    <Icon class="error-handling__icon" :icon="icon" />
    <span class="error-handling__headline">
      {{ $t(headline) }}
    </span>
    <span class="error-handling__subline">
      {{ $t(subline) }}
    </span>
  </div>
</template>

<script>
import Icon from '~/components/atoms/Icon/Icon.vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorHandling',
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      default: 'description',
    },
    headline: {
      type: String,
      required: true,
    },
    subline: {
      type: String,
      required: true,
    },
    greyBackground: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="scss">
.error-handling {
  @apply tw-flex  tw-flex-col;
  @apply tw-justify-center tw-items-center;
  @apply tw-text-center;
  @apply tw-py-8 tw-px-4;
  @apply tw-rounded-lg;

  &--grey-bg {
    @apply tw-bg-pv-grey-96;
  }

  &__icon {
    @apply tw-text-pv-red;
    @apply tw-mb-3;
  }

  &__headline {
    @apply tw-font-bold;
    @apply tw-mb-4;
  }
}
</style>
