<template>
  <div class="image-with-source">
    <ResponsiveImage
      class="image-with-source__img"
      :class="`image-with-source__${formatString}`"
      provider="storyblok"
      :image="image"
      :default-size="defaultSize"
      :sizes="sizes"
    />
    <NuxtDynamic
      v-for="item in description"
      :key="item._uid"
      class="image-with-source__component"
      v-bind="item"
      :component="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import tailwindconfig from '~/tailwind.config.js'

function parseString(stringParam, splitParam) {
  const stringArr = stringParam.split(splitParam)
  const parsedArr = []

  stringArr.forEach((stringElem) => parsedArr.push(parseInt(stringElem, 10)))

  return parsedArr
}

function calculateWidth(maxWidthByBreakpoint) {
  const sideWidth = Math.floor(parseInt(maxWidthByBreakpoint, 10) - 1)

  return sideWidth
}

function calculateHeight(maxWidthByBreakpoint, formatA, formatB) {
  const sideHeight = Math.floor(
    (calculateWidth(maxWidthByBreakpoint) / formatA) * formatB
  )
  return sideHeight
}

export default defineComponent({
  components: {
    ResponsiveImage,
  },
  props: {
    /**
     * Image data for responsive image component
     */
    image: {
      type: [Object, String],
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

    const formatArr = parseString(props.format, ':')

    const mediaWidth = tailwindconfig.theme.screens
    mediaWidth.sm = '375px'

    let defaultSize = {
      width: `${calculateWidth(mediaWidth.md)}`,
      height: `${calculateHeight(mediaWidth.md, formatArr[0], formatArr[1])}`,
    }

    let sizes = [
      {
        media: 'sm',
        width: `${calculateWidth(mediaWidth.md)}`,
        height: `${calculateHeight(mediaWidth.md, formatArr[0], formatArr[1])}`,
      },
      {
        media: 'md',
        width: `${calculateWidth(mediaWidth.lg)}`,
        height: `${calculateHeight(mediaWidth.lg, formatArr[0], formatArr[1])}`,
      },
      {
        media: 'lg',
        width: `${calculateWidth(mediaWidth.xl)}`,
        height: `${calculateHeight(mediaWidth.xl, formatArr[0], formatArr[1])}`,
      },
      {
        media: 'xl',
        width: `${calculateWidth('2566px')}`,
        height: `${calculateHeight('2566px', formatArr[0], formatArr[1])}`,
      },
    ]

    return {
      defaultSize,
      sizes,
      formatString,
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

  // &__1-1 {
  //   aspect-ratio: 1/1;
  // }

  // &__16-9 {
  //   aspect-ratio: 16/9;
  // }

  // &__2-3 {
  //   aspect-ratio: 2/3;
  // }

  // &__3-2 {
  //   aspect-ratio: 3/2;
  // }

  // &__3-1 {
  //   aspect-ratio: 3/1;
  // }
}
</style>
