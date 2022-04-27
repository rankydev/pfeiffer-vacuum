<template>
  <picture
    v-if="image && image.originalFilename && defaultSize"
    class="responsive-image"
    :class="[
      withGradient ? 'responsive-image--with-gradient' : '',
      aspectRatioString ? `responsive-image__${aspectRatioString}` : '',
    ]"
  >
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
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { theme } from '~/tailwind.config.js'

export default defineComponent({
  components: {},
  props: {
    /**
     * Image object containing source and alt text of the image
     */
    image: {
      type: [Object, String],
      default: () => {},
    },
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
     * Image data for responsive image component
     */
    defaultSize: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Array of sizes, containing the width and height for different breakpoints
     */
    sizes: {
      type: Array,
      default: () => [],
    },
    lazy: {
      type: Boolean,
      default: true,
    },
    provider: {
      type: String,
      default: 'storyblok',
    },
    aspectRatio: {
      type: String,
      default: '1:1',
      validator: (val) => ['1:1', '16:9', '2:3', '3:2', '3:1'].includes(val),
    },
  },
  setup(props, { root }) {
    const sortByBreakpoints = (sizesArr) => {
      const order = ['xl', 'lg', 'md', 'sm']
      return sizesArr.sort((a, b) => {
        return (
          order.indexOf(a.media.toLowerCase()) -
          order.indexOf(b.media.toLowerCase())
        )
      })
    }

    const aspectRatioString = computed(() =>
      props.aspectRatio.replace(':', '-')
    )

    /**
     * sorts Array from smallest to biggest breakpoint (sm to xl)
     */
    const sortedSizes = computed(() => {
      return sortByBreakpoints([...props.sizes])
    })

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
            grayscale: props.blackAndWhite ? '' : false,
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

      const img1x = root.$img(
        image.originalFilename,
        buildModifiers(image, size, format),
        { provider: image.provider }
      )
      const img2x = root.$img(
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

    return {
      mediaQuery,
      sortedSizes,
      grayscaleVal,
      aspectRatioString,
      buildSrcset,
    }
  },
})
</script>
<style lang="scss">
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
  }

  &__16-9 {
    aspect-ratio: 16/9;
  }

  &__2-3 {
    aspect-ratio: 2/3;
  }

  &__3-2 {
    aspect-ratio: 3/2;
  }

  &__3-1 {
    aspect-ratio: 3/1;
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
}
</style>
