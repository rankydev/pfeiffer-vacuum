<template>
  <div v-editable="image" class="image-with-source">
    <ResponsiveImage
      v-if="image"
      class="image-with-source__img"
      provider="storyblok"
      :image="image"
      :default-size="defaultSize"
      :sizes="imageSizes"
      :aspect-ratio="aspectRatio"
    />
    <template v-if="description">
      <NuxtDynamic
        v-for="item in description"
        :key="item._uid"
        class="image-with-source__component"
        v-bind="item"
        :component="item.uiComponent || item.component"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import tailwindconfig from '~/tailwind.config.js'

export default defineComponent({
  name: 'ImageWithSource',
  components: {
    ResponsiveImage,
  },
  props: {
    /**
     * Image data for responsive image component
     */
    image: {
      type: Object,
      default: () => {},
    },
    /**
     * Richtext which is rendered underneath the image
     */
    description: {
      type: Array,
      default: () => [],
    },
    /**
     * The Images Format selected by an editor in CMS
     */
    aspectRatio: {
      type: String,
      default: '1:1',
      validator: (val) => ['1:1', '16:9', '2:3', '3:2', '3:1'].includes(val),
    },
  },
  setup(props) {
    const tailwindConfigScreens = tailwindconfig.theme.screens
    const configScreensArr = Object.entries(tailwindConfigScreens)

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
      defaultSize,
      imageSizes,
    }
  },
})
</script>
