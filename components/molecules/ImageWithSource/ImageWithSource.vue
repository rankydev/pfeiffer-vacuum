<template>
  <div class="image-with-source">
    <ResponsiveImage
      v-if="image"
      class="image-with-source__img"
      :class="`image-with-source__${formatString}`"
      provider="storyblok"
      :image="image"
      :default-size="defaultSize"
      :sizes="imageSizes"
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

function parseMaxWidthByBreakpoint(breakpoint) {
  return parseInt(breakpoint, 10) - 1
}

function calculateHeight(breakpoint, aspectRatio) {
  const aspectRatioArr = aspectRatio.split(':')
  const aspectRatioA = aspectRatioArr[0]
  const aspectRatioB = aspectRatioArr[1]

  return Math.floor(
    (parseMaxWidthByBreakpoint(breakpoint) / aspectRatioA) * aspectRatioB
  )
}

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
      default: () => ({}),
    },
    /**
     * Subcomponent which is rendered underneath the video
     */
    description: {
      type: Array,
      default: () => [],
    },
    format: {
      type: String,
      default: '16:9',
      validator: (val) => ['1:1', '16:9', '2:3', '3:2', '3:1'].includes(val),
    },
  },
  setup(props) {
    const formatString = computed(() => props.format.replace(':', '-'))

    const mediaWidth = tailwindconfig.theme.screens
    mediaWidth.xxl = '1441px'

    const mediaWidthArr = Object.keys(mediaWidth).map(
      (objectKey) => mediaWidth[objectKey]
    )

    console.log(mediaWidthArr)

    const screenSizes = ['sm', 'md', 'lg', 'xl']

    let defaultSize = {
      width: `${parseMaxWidthByBreakpoint(mediaWidth.md)}`,
      height: `${calculateHeight(mediaWidth.md, props.format)}`,
    }

    const imageSizes = screenSizes.map((screenSize, index) => {
      return {
        media: screenSize,
        width: `${parseMaxWidthByBreakpoint(mediaWidthArr[index + 1])}`,
        height: `${calculateHeight(mediaWidthArr[index + 1], props.format)}`,
      }
    })

    console.log(imageSizes)

    return {
      defaultSize,
      formatString,
      imageSizes,
    }
  },
})
</script>

<style lang="scss">
.image-with-source {
  &__img {
    img {
      @apply tw-relative;
      @apply tw-rounded-lg;
      @apply tw-relative;
      @apply tw-overflow-hidden;
    }
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
}
</style>
