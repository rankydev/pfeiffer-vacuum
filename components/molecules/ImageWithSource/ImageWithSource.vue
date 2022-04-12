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
    const formatString = props.format.split(':')
    console.log(formatString)
    let formatArr = []
    formatString.forEach((el) => formatArr.push(parseInt(el, 10)))
    console.log(formatArr)

    const defaultFallback = 375
    const defaultSizeS = 320
    const defaultSizeMd = 192
    const defaultSizeLg = 256
    const defaultSizeXl = 360

    let defaultSize = {
      height: `${defaultFallback}`,
      width: `${defaultFallback}`,
    }
    let sizes = [
      {
        media: 's',
        width: `${defaultSizeS * formatArr[0]}px`,
        height: `${defaultSizeS * formatArr[1]}px`,
      },
      {
        media: 'md',
        width: `${defaultSizeMd * formatArr[0]}px`,
        height: `${defaultSizeMd * formatArr[1]}px`,
      },
      {
        media: 'lg',
        width: `${defaultSizeLg * formatArr[0]}px`,
        height: `${defaultSizeLg * formatArr[1]}px`,
      },
      {
        media: 'xl',
        width: `${defaultSizeXl * formatArr[0]}px`,
        height: `${defaultSizeXl * formatArr[1]}px`,
      },
    ]

    // let defaultSize = { height: '375px', width: '375px' }
    // let sizes = [
    //   { media: 's', height: '320px', width: '320px' },
    //   { media: 'md', height: '192px', width: '192px' },
    //   { media: 'lg', height: '256px', width: '256px' },
    //   { media: 'xl', height: '360px', width: '360px' },
    // ]

    // if (props.format === '3:2') {
    //   defaultSize = { height: '375px', width: '563px' }
    //   sizes = [
    //     { media: 's', height: '320px', width: '480px' },
    //     { media: 'md', height: '192px', width: '288px' },
    //     { media: 'lg', height: '256px', width: '384px' },
    //     { media: 'xl', height: '360px', width: '540px' },
    //   ]
    // }

    // if (props.format === '2:3') {
    //   defaultSize = { height: '563px', width: '375px' }
    //   sizes = [
    //     { media: 's', height: '480px', width: '320px' },
    //     { media: 'md', height: '288px', width: '192px' },
    //     { media: 'lg', height: '384px', width: '256px' },
    //     { media: 'xl', height: '540px', width: '360px' },
    //   ]
    // }

    // if (props.format === '16:9') {
    //   defaultSize = { height: '375px', width: '666.67px' }
    //   sizes = [
    //     { media: 's', height: '480px', width: '853.33px' },
    //     { media: 'md', height: '288px', width: '512px' },
    //     { media: 'lg', height: '384px', width: '682.67px' },
    //     { media: 'xl', height: '540px', width: '960px' },
    //   ]
    // }

    // if (props.format === '2:1') {
    //   defaultSize = { height: '375px', width: '750px' }
    //   sizes = [
    //     { media: 's', height: '320px', width: '640px' },
    //     { media: 'md', height: '192px', width: '384px' },
    //     { media: 'lg', height: '256px', width: '512px' },
    //     { media: 'xl', height: '360px', width: '720px' },
    //   ]
    // }

    // if (props.format === '3:1') {
    //   defaultSize = { height: '375px', width: '1125px' }
    //   sizes = [
    //     { media: 's', height: '320px', width: '960px' },
    //     { media: 'md', height: '192px', width: '576px' },
    //     { media: 'lg', height: '256px', width: '768px' },
    //     { media: 'xl', height: '360px', width: '1080px' },
    //   ]
    // }

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
