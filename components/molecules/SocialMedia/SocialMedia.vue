<template>
  <section class="social-media tw-grid-container">
    <div class="social-media__container">
      <h3>social media</h3>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SocialMedia',
  props: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.social-media {
  &__container {
    @apply tw-col-span-12;
    @apply tw-p-1;
    @apply md:tw-p-6;
  }
}
</style>
