<template>
  <Link class="teaser-card" v-bind="{ href, target }">
    <ResponsiveImage
      class="teaser-card__img"
      provider="storyblok"
      :image="image"
      :sizes="imageSizes"
      aspect-ratio="3:2"
      :with-gradient="true"
    />
    <h5 class="teaser-card__headline">{{ headline }}</h5>
  </Link>
</template>

<script>
import Link from '~/components/atoms/Link/Link'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: { Link, ResponsiveImage },
  props: {
    /**
     * Headline to display the teaser
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * Image data for responsive image component
     */
    image: {
      type: Object,
      default: () => ({}),
    },
    /**
     * The relative or absolute link
     */
    href: {
      type: String,
      default: '#',
    },
    /**
     * The target of the link
     * @values _self, _blank
     */
    target: {
      type: String,
      default: '_self',
      validator: (val) => ['_self', '_blank'].includes(val),
    },
  },
  setup() {
    const baseSizes = {
      sm: 90,
      md: 75,
      lg: 100,
    }

    const imageSizes = ['lg', 'md', 'sm'].map((size) => ({
      media: size,
      width: baseSizes[size] * 3,
      height: baseSizes[size] * 2,
    }))

    return {
      imageSizes,
      baseSizes,
    }
  },
})
</script>

<style lang="scss">
$base-sm: 90px;
$base-md: 75px;
$base-lg: 100px;

.teaser-card {
  @apply tw-relative;
  @apply tw-block;
  @apply tw-overflow-hidden;
  width: calc($base-sm * 3);
  height: calc($base-sm * 2);

  @screen md {
    width: calc($base-md * 3);
    height: calc($base-md * 2);
  }

  @screen lg {
    width: calc($base-lg * 3);
    height: calc($base-lg * 2);
  }

  img {
    @apply tw-ease-linear;
    @apply tw-duration-100;
    @apply tw-bg-pv-grey-16;
  }

  &:hover,
  &:focus {
    img {
      @apply tw-scale-105;
    }
  }

  &__img {
    @apply tw-object-cover;
  }

  &__headline {
    @apply tw-absolute;
    @apply tw-bottom-0;
    @apply tw-inset-x-0;
    @apply tw-m-4;
    @apply tw-text-center;
    @apply tw-text-pv-grey-96;
  }
}
</style>
