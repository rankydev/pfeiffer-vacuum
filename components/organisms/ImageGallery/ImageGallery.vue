<template>
  <div class="image-gallery">
    <div
      v-if="
        !errorImageUrls.includes((renderableImages[currentImage] || {}).src)
      "
      v-touch:swipe.left="nextImage"
      v-touch:swipe.right="prevImage"
      class="image-gallery__container"
    >
      <client-only>
        <zoom-on-hover
          :img-normal="(renderableImages[currentImage] || {}).src"
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
    <div v-else class="image-gallery__container">
      <ResponsiveImage aspect-ratio="3:2" fallback-image-icon-size="xxlarge" />
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
      :images="renderableImages"
      :current-image="currentImage"
      @update="currentImage = $event"
    />
    <ImageLightbox
      v-model="showLightBox"
      :images="renderableImages"
      :current-image="currentImage"
      @increaseCurr="nextImage"
      @decreaseCurr="prevImage"
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
  onMounted,
} from '@nuxtjs/composition-api'
import ImageLightbox from '~/components/molecules/ImageLightbox/ImageLightbox'
import ImageThumbnails from '~/components/molecules/ImageThumbnails/ImageThumbnails'
import { useImageHelper } from '~/composables/useImageHelper/useImageHelper'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'

export default defineComponent({
  name: 'ImageGallery',
  components: {
    ImageLightbox,
    ImageThumbnails,
    ResponsiveImage,
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
    const { getShopMedia } = useImageHelper()
    const isDesktop = app.$breakpoints.isDesktop
    const showLightBox = ref(false)
    const currentImage = ref(0)
    const errorImageUrls = ref([])
    const showSimilarLabel = computed(() => {
      return images.value[currentImage.value]?.type === 'PRIMARY'
    })

    onMounted(async () => {
      // prefetch every image on mount. Put a possible broken image url into an error url array.
      // this is needed because we want to display a fallback image on error.
      // ZoomOnHover component cannot use the ResponsiveImage component which wozkd handle this itself
      if (images.value.length) {
        for (let index = 0; index < images.value.length; index++) {
          const image = images.value[index]
          const imageEl = new Image()
          const absoluteUrl = getAbsoluteImageUrl(image.url)
          imageEl.addEventListener('error', () => {
            errorImageUrls.value.push(absoluteUrl)
          })
          imageEl.src = absoluteUrl
        }
      }
    })

    const renderableImages = computed(() => {
      return images.value.map((item) => {
        return {
          ...item,
          // introduce an already resolved image url as src for zoom on hover
          // responsive image does not use this and builds its own src with the url property
          src: getAbsoluteImageUrl(item.url),
        }
      })
    })

    const getAbsoluteImageUrl = (url) => {
      return getShopMedia(url)
    }

    const nextImage = () => {
      if (currentImage.value < images.value.length - 1) {
        currentImage.value++
      }
    }

    const prevImage = () => {
      if (currentImage.value > 0) {
        currentImage.value--
      }
    }

    return {
      showLightBox,
      currentImage,
      showSimilarLabel,
      isDesktop,
      errorImageUrls,
      renderableImages,
      getAbsoluteImageUrl,
      nextImage,
      prevImage,
    }
  },
})
</script>

<style lang="scss">
.zoom-on-hover {
  @apply tw-relative;
  height: 100% !important;
  width: 100% !important;
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
  }

  &__fallback-image {
    @apply tw-mb-2;
    height: 400px;
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
