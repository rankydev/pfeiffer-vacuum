<template>
  <section class="social-media tw-grid-container">
    <div class="social-media__container">
      <h3>social media</h3>
      <span v-for="(channel, index) in socialMediaChannels" :key="index">
        <nuxt-link :to="channel.link.url">
          {{ channel.title }}
        </nuxt-link>
      </span>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SocialMedia',
  props: {
    socialMediaChannels: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {}
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
