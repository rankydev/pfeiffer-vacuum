<template>
  <div class="image-with-source">
    <ResponsiveImage
      v-bind="imgSource"
      :default-size="{ width: '375px', height: '375px' }"
      :sizes="[
        { media: 'xl', height: '360px', width: '360px' },
        { media: 'lg', height: '256px', width: '256px' },
        { media: 'md', height: '192px', width: '192px' },
        { media: 's', height: '320px', width: '320px' },
      ]"
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
    imgSource: {
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
  },
  setup(props) {
    return {
      props,
    }
  },
})
</script>

<style lang="scss">
.image-with-source {
  @apply tw-relative;
  @apply tw-rounded-lg;
  @apply tw-overflow-hidden;
}
</style>
