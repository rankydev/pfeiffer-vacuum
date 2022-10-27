<template>
  <div v-editable="image" class="image-with-description">
    <ResponsiveImage
      provider="storyblok"
      :image="image"
      :aspect-ratio="aspectRatio"
    />
    <div v-if="image.copyright" class="image-with-description__copyright">
      <span>{{ image.copyright }}</span>
    </div>
    <template v-if="description">
      <Richtext
        :richtext="description"
        class="image-with-description__component"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  name: 'ImageWithDescription',
  components: {
    ResponsiveImage,
    Richtext,
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
      type: String,
      default: '',
    },
    /**
     * The Images Format selected by an editor in CMS
     */
    aspectRatio: {
      type: String,
      default: '1:1',
      validator: (val) =>
        ['1:1', '16:9', '2:3', '2:1', '3:2', '3:1'].includes(val),
    },
  },
})
</script>
<style lang="scss">
.image-with-description {
  img {
    @apply tw-rounded-lg;
  }

  &__copyright {
    @apply tw-text-pv-grey-48;
    @apply tw-mt-2;
    @apply tw-text-xs;
    @apply tw-leading-4;
    @apply tw-rounded-lg;
  }

  &__component {
    @apply tw-text-pv-grey-48;
    @apply tw-mt-2;

    p {
      @apply tw-text-xs;
      @apply tw-leading-4;
    }
  }
}
</style>
