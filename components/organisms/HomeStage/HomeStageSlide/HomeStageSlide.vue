<template>
  <div
    v-editable="stageContent"
    class="home-stage-slide"
    :style="{
      backgroundImage: `url(${image.originalFilename})`,
    }"
  >
    <HomeStageContent
      v-if="stageContent.length"
      class="home-stage-slide__content-block"
      v-bind="stageContent[0]"
    />
    <div class="home-stage-slide__visual-wrapper">
      <NuxtImg
        :src="interlay.originalFilename"
        :alt="interlay.alt || ''"
        :title="interlay.title || ''"
        :provider="'storyblok'"
        :loading="undefined"
        class="home-stage-slide__image"
      />
      <Bubble
        v-if="bubble[0]"
        :title="bubble[0].title"
        :richtext="bubble[0].richtext"
        :position="bubble[0].position"
      />
    </div>
  </div>
</template>

<script>
import HomeStageContent from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent.vue'
import Bubble from '~/components/molecules/Bubble/Bubble'

export default {
  name: 'HomeStageSlide',
  components: {
    HomeStageContent,
    Bubble,
  },
  props: {
    /**
     * the text area that can be seen in the home stage
     */
    stageContent: {
      type: Array,
      default: () => [],
    },
    /**
     * the background image of the stage
     */
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * an image placed absolute inside the stage
     */
    interlay: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * red filled circle with a title, a description and a position
     */
    bubble: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
$home-stage-height-xs: 512px;
$home-stage-height-md: 768px;
$home-stage-height-lg: 640px;
$home-stage-height-xl: 853px;
$home-stage-width-sm: 600px;
$home-stage-min-width-md: 620px;
$home-stage-width-lg: 1080px;
$home-stage-spacing-lg: 80px; // 100%
$home-stage-spacing-md: calc($home-stage-spacing-lg * 0.8); // 80%
$home-stage-spacing-xs: calc($home-stage-spacing-lg * 0.3); // 30%

.home-stage-slide {
  width: 100vw;
  @apply tw-relative;
  @apply tw-overflow-hidden;
  @apply tw-bg-no-repeat tw-bg-cover tw-bg-center;
  @apply tw-flex tw-flex-col tw-justify-between;
  height: $home-stage-height-xs;

  @screen md {
    height: $home-stage-height-md;
  }

  @screen lg {
    @apply tw-flex-row;
    height: $home-stage-height-lg;
  }

  @screen xl {
    height: $home-stage-height-xl;
  }

  &__visual-wrapper {
    height: 154px;

    @screen lg {
      @apply tw-w-full;
    }
  }

  &__image {
    @apply tw-absolute;
    @apply tw-h-auto;
    bottom: -$home-stage-spacing-xs;
    right: -$home-stage-spacing-xs;

    @screen sm {
      width: $home-stage-width-sm;
    }

    @screen md {
      @apply tw-w-screen;
      min-width: $home-stage-min-width-md;
      bottom: -$home-stage-spacing-md;
      right: -$home-stage-spacing-md;
    }

    @screen lg {
      width: $home-stage-width-lg;
      bottom: -$home-stage-spacing-lg;
      right: -$home-stage-spacing-lg;
    }
  }
}
</style>
