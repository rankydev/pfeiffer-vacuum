<template>
  <picture
    v-if="image && image.originalFilename && defaultSize"
    :class="{
      'responsive-image relative block after:absolute after:inset-0 after:inline-block after:bg-gradient-to-t after:from-black after:via-transparent after:to-transparent ':
        withGradient,
    }"
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
      :alt="image.alt ? image.alt : ''"
      :title="image.title ? image.title : ''"
      :width="defaultSize.width"
      :height="defaultSize.height"
      :class="imgStyle"
      :provider="image.provider"
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
    blackAndWhite: {
      type: Boolean,
      default: false,
    },
    defaultSize: {
      type: Object,
      default: () => {},
    },
    sizes: {
      type: Array,
      default: () => [],
    },
    imgStyle: {
      type: [Object, String],
      default: () => {
        return {
          'w-full object-center object-contain': true,
        }
      },
    },
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { root }) {
    const medias = []
    medias.sm = theme.screens.sm
    medias.md = theme.screens.md
    medias.lg = theme.screens.lg
    medias.xl = theme.screens.xl

    function mediaQuery(media) {
      return medias[media]
    }

    const sortedSizes = computed(() => {
      return [...props.sizes].sort(function (a, b) {
        const order = ['xl', 'lg', 'md', 'sm']
        return (
          order.indexOf(a.media.toLowerCase()) -
          order.indexOf(b.media.toLowerCase())
        )
      })
    })

    function buildModifiers(image, size, format) {
      if (!size) {
        return null
      }

      const focal = image?.focus ? { focal: image.focus } : {}
      const filtersModifiers = {
        filters: {
          ...focal,
          grayscale: props.blackAndWhite ? '' : false,
        },
      }
      const formatModifier = format ? { format } : {}

      return {
        ...filtersModifiers,
        ...formatModifier,
        height: size.height,
        width: size.width,
      }
    }

    function buildSrcset(image, size, format) {
      if (!size) {
        return null
      }

      const width = parseFloat(size.width)
      const height = parseFloat(size.height)
      const retinaWidth = `${width * 2}px`
      const retinaHeight = `${height * 2}px`

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

    const grayscaleVal = computed(() => (props.blackAndWhite ? '' : false))

    return {
      mediaQuery,
      sortedSizes,
      grayscaleVal,
      buildSrcset,
    }
  },
})
</script>
