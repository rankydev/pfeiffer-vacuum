<template>
  <div
    v-editable="stageContent"
    class="homestage"
    :style="{
      backgroundImage: `url(${image.originalFilename})`,
    }"
  >
    <HomeStageContent
      v-if="stageContent.length"
      class="homestage__content-block"
      v-bind="stageContent[0]"
    />
    <div class="homestage__visual-wrapper">
      <ResponsiveImage
        v-if="(interlay || {}).originalFilename"
        :image="interlay"
        class="homestage__image"
        :class="`homestage__image--${
          stageContent.length ? 'with-text' : 'full'
        }`"
        aspect-ratio="16:9"
      />
      <Bubble
        :title="'Bubble Headline'"
        :richtext="'Hallo Hallo'"
        :position="bubble.position"
      />
    </div>
  </div>
</template>

<script>
import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Bubble from '~/components/molecules/Bubble/Bubble'

export default {
  name: 'HomeStageModule',
  components: {
    HomeStageContent,
    ResponsiveImage,
    Bubble,
  },
  props: {
    /**
     * The stage content which can be added optionally
     */
    stageContent: {
      type: Array,
      default: () => [],
    },
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    interlay: {
      type: [Object, String],
      default: () => ({}),
    },
    bubble: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.homestage {
  @apply tw-bg-no-repeat tw-bg-cover tw-bg-center;
  @apply tw-flex tw-flex-col tw-justify-between;
  height: 512px;

  &__visual-wrapper {
    height: 154px;
  }
}
</style>
