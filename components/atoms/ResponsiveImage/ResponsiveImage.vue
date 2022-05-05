<template>
  <div>
    <picture v-if="hasImage" :class="responsiveImgClasses">
      <source
        v-for="size in sortedSizes"
        :key="'webp_' + size.media"
        :media="'(min-width: ' + mediaQuery(size.media) + ')'"
        :srcset="buildSrcset(image, size, 'webp')"
        type="image/webp"
      />
      <source
        :srcset="buildSrcset(image, defaultSize, 'webp')"
        type="image/webp"
      />
      <source
        v-for="size in sortedSizes"
        :key="size.media"
        :media="'(min-width: ' + mediaQuery(size.media) + ')'"
        :srcset="buildSrcset(image, size)"
      />
      <source :srcset="buildSrcset(image, defaultSize)" />
      <NuxtImg
        :src="image.originalFilename"
        :modifiers="{
          filters: { focal: image.focus, grayscale: grayscaleVal },
        }"
        :alt="image.alt || ''"
        :title="image.title || ''"
        :provider="provider"
        :loading="lazy ? 'lazy' : undefined"
      />
    </picture>
    <div
      v-else
      :class="[
        'responsive-image__placeholder',
        `responsive-image__${aspectRatioString}`,
      ]"
    >
      <Icon icon="image" size="xlarge" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { theme } from '~/tailwind.config.js'
import tailwindconfig from '~/tailwind.config.js'
import Icon from '~/components/atoms/Icon/Icon'

export default defineComponent({
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
    },
    /**
     * Parameter for the aspect ratio of the image
     */
    aspectRatio: {
      type: String,
      default: '1:1',
      validator: (val) =>
        ['1:1', '16:9', '2:3', '3:2', '3:1', '2:1'].includes(val),
    },
  },
  setup(props) {
    const tailwindConfigScreens = tailwindconfig.theme.screens
    const configScreensArr = Object.entries(tailwindConfigScreens)

    const { $img } = useContext()

    /**
     * Sort array of sizes by breakpoint descending from xl to sm
     * @param sizesArr
     * @return Array sortedSizes
     */
    const sortByBreakpoints = (sizesArr) => {
      const order = ['xl', 'lg', 'md', 'sm']
      return sizesArr.sort((a, b) => {
        return (
          order.indexOf(a.media.toLowerCase()) -
          order.indexOf(b.media.toLowerCase())
        )
      })
    }

    /**
     * Property returns if component has image
     */
    const hasImage = computed(() => {
      return props.image && props.image.originalFilename && defaultSize
    })

    /**
     * Property returns modified string for aspect ratio classes
     */
    const aspectRatioString = computed(() =>
      props.aspectRatio.replace(':', '-')
    )

    /**
     * Return classes of responsive image parent element based on props for gradient and aspect ratio
     */
    const responsiveImgClasses = computed(() => {
      const gradient = props.withGradient
        ? 'responsive-image--with-gradient'
        : ''

      return `responsive-image ${gradient}`
    })

    /**
     * sorts Array from smallest to biggest breakpoint (sm to xl)
     */
    const sortedSizes = computed(() => {
      return sortByBreakpoints([...imageSizes])
    })

    /**
     * property for black and white filter of image api
     */
    const grayscaleVal = computed(() => (props.blackAndWhite ? '' : false))

    /**
     * loads breakpoints from tailwind.config into a medias Array
     */
    const medias = { ...theme.screens }

    const mediaQuery = (media) => {
      return medias[media]
    }

    /**
     * Builds modifiers fro image, size and format
     */
    const buildModifiers = (image, size, format) => {
      if (size) {
        return {
          filters: {
            focal: image?.focus,
            grayscale: grayscaleVal.value,
          },
          format,
          height: size.height,
          width: size.width,
        }
      }
      return null
    }

    /**
     * builds the Sourceset for rendering the image
     */
    const buildSrcset = (image, size, format) => {
      if (!size) {
        return null
      }

      const width = parseInt(size.width)
      const height = parseInt(size.height)
      const retinaWidth = width * 2
      const retinaHeight = height * 2

      const img1x = $img(
        image.originalFilename,
        buildModifiers(image, size, format),
        { provider: image.provider }
      )
      const img2x = $img(
        image.originalFilename,
        buildModifiers(
          image,
          { height: retinaHeight, width: retinaWidth },
          format
        ),
        { provider: image.provider }
      )

      return `${img1x} 1x, ${img2x} 2x`
    }

    /**
     * Calculate max width of current breakpoint by start width of next breakpoint
     * @param startWidthNextBreakpoint
     * @return {number}
     */
    const calculateMaxWidthByBreakpoint = (startWidthNextBreakpoint) => {
      return Math.floor(parseInt(startWidthNextBreakpoint, 10) - 1)
    }

    /**
     * Calculate image height by given width and aspect ratio
     * @return {number}
     * @param maxWidth
     * @param aspectRatio
     */
    const calculateHeight = (maxWidth, aspectRatio) => {
      const aspectRatioArr = aspectRatio.split(':')
      const aspectRatioA = aspectRatioArr[0]
      const aspectRatioB = aspectRatioArr[1]

      return Math.floor((maxWidth / aspectRatioA) * aspectRatioB)
    }

    /**
     * calculate width, as well as height of image for each breakpoint
     * @return Array
     */
    const imageSizes = configScreensArr.map((objectEntry, index) => {
      if (index !== 3) {
        const startWidthNextBreakpoint = configScreensArr[index + 1][1]
        const maxWidthBreakpoint = calculateMaxWidthByBreakpoint(
          startWidthNextBreakpoint
        )

        return {
          media: objectEntry[0],
          width: maxWidthBreakpoint,
          height: calculateHeight(maxWidthBreakpoint, props.aspectRatio),
        }
      } else {
        // last entry is xl, no next element given, 1440px is maxWidth
        return {
          media: objectEntry[0],
          width: 1440,
          height: calculateHeight(1440, props.aspectRatio),
        }
      }
    })

    /**
     * default size of the image using sm-breakpoint
     */
    const defaultSize = {
      width: imageSizes[0].width,
      height: imageSizes[0].height,
    }

    return {
      mediaQuery,
      sortedSizes,
      defaultSize,
      grayscaleVal,
      hasImage,
      responsiveImgClasses,
      aspectRatioString,
      buildSrcset,
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
    @apply tw-rounded-lg;
    @apply tw-overflow-hidden;
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

  &--with-gradient {
    &::after {
      @apply tw-absolute;
      @apply tw-inset-0;
      @apply tw-inline-block;
      @apply tw-bg-gradient-to-t;
      @apply tw-from-pv-black;
      @apply tw-via-pv-transparent;
      @apply tw-to-pv-transparent;
    }
  }

  &__placeholder {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-bg-pv-grey-96;
    @apply tw-max-w-full;

    span {
      @apply tw-text-pv-grey-64;
    }
  }
}
</style>
