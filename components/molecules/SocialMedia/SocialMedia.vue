<template>
  <section class="social-media tw-grid-container">
    <div class="social-media__container">
      <Link
        v-for="link in media"
        :key="link._uid"
        :href="link.link"
        :target="link.target"
      >
        <Icon class="social-media__icon" :icon="link.icon" custom />
      </Link>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SocialMedia',
  props: {
    media: {
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
    @apply tw-p-6 md:tw-p-10;
    @apply tw-flex tw-justify-center tw-gap-6;
  }

  &__icon {
    @apply tw-text-pv-grey-64;
    @apply tw-h-10 tw-w-10;
    @apply tw-p-1;

    @screen md {
      @apply tw-h-16 tw-w-16;
      @apply tw-p-3;
    }
  }
}
</style>
