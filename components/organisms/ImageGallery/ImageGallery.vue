<template>
  <div class="image-gallery">
    <div class="image-gallery__container">
      <client-only>
        <zoom-on-hover
          :img-normal="(images[currentImage] || {}).url"
          :scale="2"
          :disabled="!isDesktop"
          @click.native="showLightBox = true"
        />
        <Button
          icon="zoom_out_map"
          variant="secondary"
          shape="outlined"
          class="image-gallery__zoom-indicator"
          @click.native="showLightBox = true"
        />
      </client-only>
    </div>
    <span
      class="image-gallery__similar-label"
      :class="{
        'image-gallery__similar-label--hidden': !showSimilarLabel,
      }"
      >{{ $t('product.similarImage') }}</span
    >
    <ImageThumbnails
      v-if="images.length > 1 || showSingleThumbnail"
      :images="images"
      :current-image="currentImage"
      @update="currentImage = $event"
    />
    <ImageLightbox
      v-model="showLightBox"
      :images="images"
      :current-image="currentImage"
      @increaseCurr="currentImage++"
      @decreaseCurr="currentImage--"
      @setCurr="currentImage = $event"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
  toRefs,
} from '@nuxtjs/composition-api'
import ImageLightbox from '~/components/molecules/ImageLightbox/ImageLightbox'
import ImageThumbnails from '~/components/molecules/ImageThumbnails/ImageThumbnails'

export default defineComponent({
  name: 'ImageGallery',
  components: {
    ImageLightbox,
    ImageThumbnails,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
    showSingleThumbnail: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { images } = toRefs(props)
    const { app } = useContext()
    const isDesktop = app.$breakpoints.isDesktop

    const showLightBox = ref(false)
    const currentImage = ref(0)

    const showSimilarLabel = computed(() => {
      return images.value[currentImage.value]?.type === 'PRIMARY'
    })

    return { showLightBox, currentImage, showSimilarLabel, isDesktop }
  },
})
</script>

<style lang="scss">
.zoom-on-hover {
  @apply tw-relative;
  height: 100% !important;
  width: 100% !important;
  outline: none !important;
  @apply tw-rounded-lg;
  @apply tw-p-4;

  &:hover {
    @apply tw-cursor-zoom-in;
  }

  .normal {
    @apply tw-w-full;
    @apply tw-h-full;
    @apply tw-object-contain;
  }
}

.image-gallery {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-w-full;

  &__container {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-relative;
    @apply tw-mb-2;
    height: 400px;
    @apply tw-rounded-lg;
    @apply tw-bg-pv-grey-96;
  }

  &__zoom-indicator {
    @apply tw-absolute;
    @apply tw-right-4;
    @apply tw-bottom-4;
    @apply tw-cursor-pointer;

    &:hover {
      @apply tw-text-pv-white;
    }
  }

  &__similar-label {
    @apply tw-bg-pv-white;
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
    @apply tw-mb-6;
    @apply tw-self-start;

    &--hidden {
      @apply tw-invisible;
    }
  }
}
</style>
