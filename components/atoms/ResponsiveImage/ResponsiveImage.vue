<template>
  <picture
    v-if="src && !imageLoadingError"
    class="responsive-image"
    :class="{
      'responsive-image__rounded': rounded,
      'responsive-image__full': modeFull,
    }"
  >
    <source
      v-for="webpSource in webpSources"
      :key="'webp_' + webpSource.key"
      :media="webpSource.media"
      :srcset="webpSource.srcset"
      type="image/webp"
    />

    <source
      v-for="pngSource in pngSources"
      :key="'png_' + pngSource.key"
      :media="pngSource.media"
      :srcset="pngSource.srcset"
    />

    <NuxtImg
      :src="src"
      :modifiers="modifiers"
      :alt="alt"
      :title="title"
      :provider="provider"
      :loading="lazy ? 'lazy' : undefined"
      :class="[
        `responsive-image__${aspectRatioString}`,
        { 'responsive-image__contain': containImage },
      ]"
      @error="handleImageError"
    />
    <div v-if="withGradient" class="responsive-image__gradient-overlay" />
  </picture>

  <div
    v-else
    :class="[
      'responsive-image__placeholder',
      `responsive-image__${aspectRatioString}`,
    ]"
  >
    <Icon icon="image_not_supported" :size="fallbackImageIconSize" />
  </div>
</template>

<script>
import { useHybrisProvider } from './provider/hybrisProvider'
import { useStoryblokProvider } from './provider/storyblokProvider'
import {
  computed,
  defineComponent,
  useContext,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
  name: 'ResponsiveImage',
  components: { Icon },
  props: {
    /**
     * Image object containing source and alt text of the image
     */
    image: {
      type: [Object, String],
      default: () => ({}),
    },

    /**
     * Parameter if the image should be rendered with a gradient overlay
     */
    withGradient: {
      type: Boolean,
      default: false,
    },

    /**
     * Parameter if the image should be rendered in black/white or color
     */
    blackAndWhite: {
      type: Boolean,
      default: false,
    },
    /**
     * Parameter if lazy loading should be activated
     */
    lazy: {
      type: Boolean,
      default: true,
    },
    /**
     * Parameter for specific image provider
     * Read more here: https://image.nuxtjs.org/getting-started/providers/
     */
    provider: {
      type: String,
      default: 'storyblok',
      validator: (val) => ['storyblok', 'hybris', 'static'].includes(val),
    },
    /**
     * Parameter for the aspect ratio of the image
     */
    aspectRatio: {
      type: String,
      default: '1:1',
      validator: (val) =>
        ['1:1', '16:9', '2:3', '3:2', '3:1', '2:1', '21:28'].includes(val),
    },
    modeFull: {
      type: Boolean,
      default: false,
    },
    containImage: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    fallbackImageIconSize: {
      type: String,
      default: 'xlarge',
      validator: (val) => ['xlarge', 'xxlarge'].includes(val),
    },
  },
  setup(props) {
    const context = useContext()

    const aspectRatioString = computed(() =>
      props.aspectRatio.replace(':', '-')
    )

    const buildFallbackImage = () => {
      return {
        src: null,
      }
    }

    const imageLoadingError = ref(false)

    const handleImageError = () => {
      imageLoadingError.value = true
    }

    let buildImage

    if (!props.image) {
      buildImage = buildFallbackImage
    } else {
      switch (props.provider) {
        case 'storyblok':
          buildImage = useStoryblokProvider(context).buildImage
          break
        case 'hybris':
          buildImage = useHybrisProvider(context).buildImage
          break
        default:
          buildImage = () => ({})
      }
    }

    watch(
      () => props.image,
      () => {
        imageLoadingError.value = false
      }
    )

    return {
      aspectRatioString,
      imageLoadingError,
      handleImageError,
      ...buildImage(props),
    }
  },
})
</script>
<style lang="scss">
@mixin calculate-aspect-ratio-properties(
  $aspect-ratio-width,
  $aspect-ratio-height
) {
  width: 100%;
  height: calc((100% / $aspect-ratio-width) * $aspect-ratio-height);
}

.responsive-image {
  @apply tw-relative;
  @apply tw-block;

  img {
    @apply tw-relative;
    @apply tw-overflow-hidden;
    @apply tw-w-full;
  }

  &__contain {
    @apply tw-object-contain;
  }

  &__1-1 {
    aspect-ratio: 1/1;
    @include calculate-aspect-ratio-properties(1, 1);
  }

  &__16-9 {
    aspect-ratio: 16/9;
    @include calculate-aspect-ratio-properties(16, 9);
  }

  &__2-3 {
    aspect-ratio: 2/3;
    @include calculate-aspect-ratio-properties(2, 3);
  }

  &__3-2 {
    aspect-ratio: 3/2;
    @include calculate-aspect-ratio-properties(3, 2);
  }

  &__3-1 {
    aspect-ratio: 3/1;
    @include calculate-aspect-ratio-properties(3, 1);
  }

  &__2-1 {
    aspect-ratio: 2/1;
    @include calculate-aspect-ratio-properties(2, 1);
  }

  &__full {
    @apply tw-h-full;
    @apply tw-w-full;
  }

  &__gradient-overlay {
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-inline-block;
    @apply tw-bg-gradient-to-t;
    @apply tw-from-pv-black;
    @apply tw-via-pv-transparent;
    @apply tw-to-pv-transparent;
  }

  &__placeholder {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-bg-pv-grey-96;
    @apply tw-max-w-full;
    @apply tw-h-full;

    span {
      @apply tw-text-pv-grey-88;
    }
  }

  &__rounded {
    img,
    .responsive-image__gradient-overlay {
      @apply tw-rounded-lg;
    }
  }
}
</style>
