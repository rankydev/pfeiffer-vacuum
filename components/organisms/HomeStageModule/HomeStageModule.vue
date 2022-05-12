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
      <NuxtImg
        :src="interlay.originalFilename"
        :alt="interlay.alt || ''"
        :title="interlay.title || ''"
        :provider="'storyblok'"
        :loading="undefined"
        class="homestage__image"
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
import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent.vue'
import Bubble from '~/components/molecules/Bubble/Bubble'

export default {
  name: 'HomeStageModule',
  components: {
    HomeStageContent,
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
  @apply tw-relative;
  @apply tw-overflow-hidden;
  @apply tw-bg-no-repeat tw-bg-cover tw-bg-center;
  @apply tw-flex tw-flex-col tw-justify-between;
  height: 512px;

  @screen md {
    height: 768px;
  }

  @screen lg {
    @apply tw-flex-row;
    height: 640px;
  }

  @screen xl {
    height: 853px;
  }

  &__visual-wrapper {
    height: 154px;

    @screen lg {
      width: 100%;
    }
  }

  &__image {
    @apply tw-absolute;
    @apply tw-h-auto;
    bottom: -24px;
    right: -24px;

    @screen sm {
      width: 600px;
    }

    @screen md {
      width: 100vw;
      min-width: 620px;
      bottom: -64px;
      right: -64px;
    }

    @screen lg {
      width: 1080px;
      bottom: -80px;
      right: -80px;
    }
  }
}
</style>
