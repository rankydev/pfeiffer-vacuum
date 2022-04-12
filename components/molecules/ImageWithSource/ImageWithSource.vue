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
    const defaultSize = { width: '375px', height: '375px' }
    const sizes = [
      { media: 's', height: '320px', width: '320px' },
      { media: 'md', height: '192px', width: '192px' },
      { media: 'lg', height: '256px', width: '256px' },
      { media: 'xl', height: '360px', width: '360px' },
    ]
    console.log(props.format, 'format')

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
