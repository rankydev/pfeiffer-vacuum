<template>
  <div class="image-with-source">
    <ResponsiveImage
      class="image-with-source__img"
      :class="`image-with-source__${formatString}`"
      provider="storyblok"
      :image="image"
      :default-size="defaultSize"
      :sizes="sizes"
      :image-width="imageWidth"
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

function calculateWidth(width, ratioA, ratioB) {
  const sideWidth = Math.floor(parseInt(width, 10) * (ratioA / ratioB))

  return sideWidth
}

function calculateHeight(width, ratioA, ratioB, formatA, formatB) {
  const sideHeight = Math.floor(
    (calculateWidth(width, ratioA, ratioB) / formatA) * formatB
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
    // imageWidth: {
    //   type: String,
    //   default: '1/3',
    //   validator: (val) => ['1/1', '1/4', '1/2', '1/3', '2/3'].includes(val),
    // },
  },
  setup(props) {
    const formatString = computed(() => props.format.replace(':', '-'))

    const formatArr = parseString(props.format, ':')
    const imageWidthArr = parseString(props.imageWidth, '/')

    const mediaWidth = tailwindconfig.theme.screens
    mediaWidth.sm = '375px'

    let defaultSize = {
      width: `${calculateWidth(
        mediaWidth.sm,
        imageWidthArr[0],
        imageWidthArr[1]
      )}`,
      height: `${calculateHeight(
        mediaWidth.sm,
        imageWidthArr[0],
        imageWidthArr[1],
        formatArr[0],
        formatArr[1]
      )}`,
    }

    let sizes = [
      {
        media: 'sm',
        width: `${calculateWidth(
          mediaWidth.sm,
          imageWidthArr[0],
          imageWidthArr[1]
        )}`,
        height: `${calculateHeight(
          mediaWidth.sm,
          imageWidthArr[0],
          imageWidthArr[1],
          formatArr[0],
          formatArr[1]
        )}`,
      },
      {
        media: 'md',
        width: `${calculateWidth(
          mediaWidth.md,
          imageWidthArr[0],
          imageWidthArr[1]
        )}`,
        height: `${calculateHeight(
          mediaWidth.md,
          imageWidthArr[0],
          imageWidthArr[1],
          formatArr[0],
          formatArr[1]
        )}`,
      },
      {
        media: 'lg',
        width: `${calculateWidth(
          mediaWidth.lg,
          imageWidthArr[0],
          imageWidthArr[1]
        )}`,
        height: `${calculateHeight(
          mediaWidth.lg,
          imageWidthArr[0],
          imageWidthArr[1],
          formatArr[0],
          formatArr[1]
        )}`,
      },
      {
        media: 'xl',
        width: `${calculateWidth(
          mediaWidth.xl,
          imageWidthArr[0],
          imageWidthArr[1]
        )}`,
        height: `${calculateHeight(
          mediaWidth.xl,
          imageWidthArr[0],
          imageWidthArr[1],
          formatArr[0],
          formatArr[1]
        )}`,
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
