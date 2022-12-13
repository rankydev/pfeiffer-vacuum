<template>
  <div class="image-thumbnails">
    <div class="image-thumbnails__container">
      <div
        v-for="(image, index) in images"
        :key="`image-thumbnails__image-wrapper-${index}`"
        class="image-thumbnails__image-wrapper"
        :class="{
          'image-thumbnails__image-wrapper--active': currentImage === index,
        }"
        @click="$emit('update', index)"
      >
        <ResponsiveImage
          :image="image"
          provider="hybris"
          aspect-ratio="1:1"
          class="image-thumbnails__image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'

export default defineComponent({
  name: 'ImageThumbnail',
  components: {
    ResponsiveImage,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
    currentImage: {
      type: Number,
      required: true,
    },
  },
  emits: ['update'],
})
</script>

<style lang="scss">
.image-thumbnails {
  @apply tw-relative;

  &__container {
    @apply tw-w-full;
    @apply tw-flex;
    @apply tw-flex-nowrap;
    @apply tw-overflow-x-hidden;
    @apply tw-justify-center;
  }

  &__image-wrapper {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-w-2;
    @apply tw-h-2;
    @apply tw-p-2;
    @apply tw-mr-2;
    @apply tw-bg-pv-grey-80;

    @screen md {
      @apply tw-rounded-lg;
      @apply tw-w-20;
      @apply tw-h-20;
      @apply tw-border-pv-grey-80;
      @apply tw-border-2;
      @apply tw-border-solid;
      @apply tw-bg-pv-transparent;

      &--active {
        @apply tw-border-pv-red;
        background-color: transparent !important;
      }
    }

    &--active {
      @apply tw-bg-pv-red;
    }

    &:hover {
      @apply tw-border-pv-red-lighter;
    }
  }

  &__image {
    @apply tw-invisible;

    img {
      @apply tw-object-contain;
    }

    @screen md {
      @apply tw-visible;
      @apply tw-max-h-12;
      max-width: 48px;
    }
  }
}
</style>
