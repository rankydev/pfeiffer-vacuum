<template>
  <section class="social-media tw-grid-container">
    <div class="social-media__container">
      <SocialMediaIconLink
        v-for="item in socialMedia"
        :key="item._uid"
        class="social-media__icon"
        v-bind="item"
      />
    </div>
  </section>
</template>

<script>
import SocialMediaIconLink from '~/components/molecules/SocialMediaIconLink/SocialMediaIconLink'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SocialMedia',
  props: {
    socialMedia: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.social-media {
  @apply tw-bg-pv-white;

  &__container {
    @apply tw-col-span-full;
    @apply tw-py-6;
    @apply tw-flex tw-justify-center tw-gap-6;

    @screen md {
      @apply tw-py-10;
    }
  }

  &__icon {
    @apply tw-text-pv-grey-64;
    @apply tw-p-1;

    @screen md {
      @apply tw-p-3;
    }
  }
}
</style>
