<template>
  <div class="image-with-source">
    <ResponsiveImage
      class="image-with-source__img"
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
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

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
      default: () => {},
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
      default: '1:1',
    },
  },
  setup(props) {
    const formatStringArr = props.format.split(':')
    const formatArr = []

    formatStringArr.forEach((formatString) =>
      formatArr.push(parseInt(formatString, 10))
    )

    const defaultHeight = 375
    const defaultHeightS = 320
    const defaultHeightMd = 192
    const defaultHeightLg = 256
    const defaultHeightXl = 360

    let defaultSize = {
      width: `${(defaultHeight / formatArr[1]) * formatArr[0]}`,
      height: `${defaultHeight}`,
    }
    let sizes = [
      {
        media: 'sm',
        width: `${Math.floor((defaultHeightS / formatArr[1]) * formatArr[0])}`,
        height: `${defaultHeightS}`,
      },
      {
        media: 'md',
        width: `${Math.floor((defaultHeightMd / formatArr[1]) * formatArr[0])}`,
        height: `${defaultHeightMd}`,
      },
      {
        media: 'lg',
        width: `${Math.floor((defaultHeightLg / formatArr[1]) * formatArr[0])}`,
        height: `${defaultHeightLg}`,
      },
      {
        media: 'xl',
        width: `${Math.floor((defaultHeightXl / formatArr[1]) * formatArr[0])}`,
        height: `${defaultHeightXl}`,
      },
    ]

    console.log(sizes)

    return {
      props,
      defaultSize,
      sizes,
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
}
</style>
