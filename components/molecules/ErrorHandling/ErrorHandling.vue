<template>
  <div
    class="error-handling"
    :class="{ 'error-handling--grey-bg': greyBackground }"
  >
    <Icon class="error-handling__icon" icon="cloud_off" />
    <span class="error-handling__headline">
      {{ $t(headline) }}
    </span>
    <CustomerSupportLink />
  </div>
</template>

<script>
import Icon from '~/components/atoms/Icon/Icon.vue'
import CustomerSupportLink from '~/components/molecules/ErrorHandling/partials/CustomerSupportLink'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorHandling',
  components: {
    Icon,
    CustomerSupportLink,
  },
  props: {
    headline: {
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
  @apply tw-flex tw-flex-col;
  @apply tw-justify-center tw-items-center;
  @apply tw-text-center;
  @apply tw-text-pv-grey-16;
  @apply tw-py-[274px] tw-px-4;
  @apply tw-rounded-lg;

  &--grey-bg {
    @apply tw-bg-pv-grey-96;
  }

  &__icon {
    @apply tw-text-pv-red;
  }

  &__headline {
    @apply tw-font-bold;
    @apply tw-mb-2;
    @apply tw-mt-[26px];
  }
}
</style>
