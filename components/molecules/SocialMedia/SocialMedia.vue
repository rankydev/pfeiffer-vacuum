<template>
  <content-wrapper class="tw-grid-container">
    <section class="social-media">
      <social-media-icon-link
        v-for="item in socialMedia"
        :key="item._uid"
        class="social-media__icon"
        v-bind="item"
      />
    </section>
  </content-wrapper>
</template>

<script>
import SocialMediaIconLink from '~/components/molecules/SocialMediaIconLink/SocialMediaIconLink'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SocialMedia',
  components: {
    SocialMediaIconLink,
    ContentWrapper,
  },
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
  @apply tw-col-span-full;
  @apply tw-py-6;
  @apply tw-flex tw-justify-center tw-gap-6;

  @screen md {
    @apply tw-py-10;
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
