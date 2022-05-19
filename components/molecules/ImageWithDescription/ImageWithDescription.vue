<template>
  <div v-editable="image" class="image-with-description">
    <ResponsiveImage
      class="image-with-description__img"
      provider="storyblok"
      :image="image"
      :aspect-ratio="aspectRatio"
    />
    <template v-if="description">
      <NuxtDynamic
        v-for="item in description"
        :key="item._uid"
        class="image-with-description__component"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  name: 'ImageWithDescription',
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
      // validator: (val) => ['1:1', '16:9', '2:3', '3:2', '3:1'].includes(val),
    },
  },
})
</script>
<style lang="scss">
.image-with-description {
  &__component {
    @apply tw-text-pv-grey-48;
    @apply tw-mt-2;
  }
}
</style>
