<template>
  <GenericModal
    :is-open="value"
    :fill-viewport="true"
    @closeModal="$emit('input', $event)"
  >
    <div class="image-lightbox">
      <div class="image-lightbox__selected-image-wrapper">
        <Button
          icon="arrow_back_ios_new"
          class="image-lightbox__arrow image-lightbox__arrow--left"
          variant="secondary"
          shape="filled"
          @click.native="prevImage"
        />
        <ResponsiveImage
          :key="currentImage"
          v-touch:swipe.left="nextImage"
          v-touch:swipe.right="prevImage"
          :image="images[currentImage]"
          provider="hybris"
          fallback-image-icon-size="xxlarge"
          class="image-lightbox__selected-image"
        />
        <Button
          icon="arrow_forward_ios"
          class="image-lightbox__arrow image-lightbox__arrow--right"
          variant="secondary"
          shape="filled"
          @click.native="nextImage"
        />
      </div>
      <ImageThumbnails
        :images="images"
        :current-image="currentImage"
        @update="$emit('setCurr', $event)"
      />
    </div>
  </GenericModal>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import ImageThumbnails from '~/components/molecules/ImageThumbnails/ImageThumbnails'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'

export default defineComponent({
  name: 'ImageLightbox',
  components: {
    GenericModal,
    ImageThumbnails,
    ResponsiveImage,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    images: {
      type: Array,
      required: true,
    },
    currentImage: {
      type: Number,
      default: 0,
    },
  },
  emits: ['input', 'increaseCurr', 'decreaseCurr', 'setCurr'],
  setup(props, { emit }) {
    const { currentImage, images } = toRefs(props)

    const nextImage = () => {
      if (currentImage.value < images.value.length - 1) {
        emit('increaseCurr')
      }
    }
    const prevImage = () => {
      if (currentImage.value > 0) {
        emit('decreaseCurr')
      }
    }

    return { nextImage, prevImage }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/z-index';

.image-lightbox {
  @apply tw-w-full;
  @apply tw-h-full;
  @apply tw-bg-pv-white;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-justify-between;

  &__selected-image-wrapper {
    @apply tw-block;
    @apply tw-relative;
    @apply tw-py-8;
    @apply tw-w-full;
    @apply tw-h-full;
    @apply tw-overflow-hidden;

    @screen md {
      padding: 32px 160px;
      @apply tw-py-8;
      @apply tw-px-40;
    }

    @screen xl {
      @apply tw-py-8;
      @apply tw-px-80;
    }
  }

  &__selected-image img {
    @apply tw-w-full;
    @apply tw-h-full;
    @apply tw-object-contain;
  }

  &__arrow {
    @apply tw-hidden;
    @apply tw-absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: $image-lightbox;

    @screen md {
      @apply tw-inline-flex;
    }

    &::selection {
      @apply tw-bg-pv-transparent;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }

    &--left {
      @apply tw-left-0;
    }

    &--right {
      @apply tw-right-0;
    }
  }
}
</style>
