<template>
  <div class="image-slider">
    <div class="image-slider__container">
      <client-only>
        <zoom-on-hover
          :img-normal="(images[currentImage] || {}).url"
          :scale="2"
          :disabled="!isDesktop"
          @click.native="showLightBox = true"
        />
        <span v-if="showSimilarLabel" class="image-slider__similar-label">{{
          $t('product.similarImage')
        }}</span>
        <Icon
          icon="ic_zoom_in"
          class="image-slider__zoom-indicator"
          @click.native="showLightBox = true"
        />
      </client-only>
    </div>
    <ImageThumbnails
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
  name: 'ImageSlider',
  components: {
    ImageLightbox,
    ImageThumbnails,
  },
  props: {
    images: {
      type: Array,
      required: true,
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
  height: 380px !important;
  width: 450px !important;
  outline: none !important;

  &:hover {
    @apply tw-cursor-zoom-in;
  }

  .normal {
    @apply tw-w-full;
    @apply tw-h-full;
    @apply tw-object-contain;
  }
}

.image-slider {
  @apply tw-w-full;
  @apply tw-my-8;

  &__container {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-relative;
    @apply tw-mb-10;
    height: 400px;
  }

  &__zoom-indicator {
    @apply tw-absolute;
    @apply tw-right-4;
    @apply tw-bottom-4;
    @apply tw-cursor-pointer;
    @apply tw-outline-none;
  }

  &__similar-label {
    @apply tw-absolute;
    @apply tw-bottom-0;
    @apply tw-left-0;
    @apply tw-bg-pv-white;
    @apply tw-py-1;
    @apply tw-px-2;
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
  }
}
</style>
