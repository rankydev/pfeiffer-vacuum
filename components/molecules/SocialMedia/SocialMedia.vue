<template>
  <section class="social-media tw-grid-container">
    <div class="social-media__container">
      <h3>social media</h3>
      <span v-for="(channel, index) in socialMedia" :key="index">
        <Link :href="channel.link.url">
          {{ channel.title }}
        </Link>
      </span>
    </div>
  </section>
</template>

<script>
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
    @apply tw-col-span-12;
    @apply tw-p-1;
    @apply md:tw-p-6;
  }
}
</style>
