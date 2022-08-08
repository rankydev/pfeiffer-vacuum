<template>
  <div
    v-editable="stageContent"
    :class="[
      'error-image-teaser',
      image.originalFilename ? '' : 'error-image-teaser__placeholder',
    ]"
    :style="{
      backgroundImage: `url(${image.originalFilename})`,
    }"
    @click="handleClick"
  >
    <div v-if="showStars" class="night">
      <div v-for="index in starsAmount" :key="index" class="shooting-star" />
    </div>

    <div class="tw-grid-container">
      <HomeStageSlideContent
        v-if="stageContent.length"
        class="error-image-teaser__content-block"
        v-bind="stageContent[0]"
      />
    </div>
    <NuxtImg
      v-if="interlay.originalFilename"
      :src="interlay.originalFilename"
      :alt="interlay.alt || ''"
      :title="interlay.title || ''"
      provider="storyblok"
      class="error-image-teaser__image"
    />
  </div>
</template>

<script>
import HomeStageSlideContent from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent.vue'
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'ErrorImageTeaser',
  components: {
    HomeStageSlideContent,
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
  },
  setup() {
    const starsAmount = 20
    const showStars = ref(false)
    const counter = ref(0)

    const handleClick = () => {
      counter.value += 1

      if (counter.value >= 5) {
        showStars.value = true
      }
    }

    return {
      starsAmount,
      showStars,
      counter,
      handleClick,
    }
  },
}
</script>

<style lang="scss">
$home-stage-width: 100%;
$home-stage-height-xs: 512px;
$home-stage-height-md: 768px;
$home-stage-height-lg: 640px;
$home-stage-height-xl: 853px;
$home-stage-interlay-width-sm: 600px;
$home-stage-interlay-min-width-md: 620px;
$home-stage-interlay-width-lg: 1080px;
$home-stage-interlay-spacing-lg: 80px; // 100%
$home-stage-interlay-spacing-md: calc(
  $home-stage-interlay-spacing-lg * 0.8
); // 80%
$home-stage-interlay-spacing-xs: calc(
  $home-stage-interlay-spacing-lg * 0.3
); // 30%

.error-image-teaser {
  @apply tw-relative;
  @apply tw-overflow-hidden;
  @apply tw-bg-no-repeat tw-bg-cover tw-bg-center;
  @apply tw-flex tw-flex-col tw-justify-between;
  height: $home-stage-height-xs;
  width: $home-stage-width;

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

  &__content-block {
    @apply tw-z-10;
    @apply tw-col-span-12 md:tw-col-span-6 lg:tw-col-span-6 lg:tw-col-start-1;
  }

  &__placeholder {
    @apply tw-bg-pv-grey-16;
  }

  &__image {
    @apply tw-absolute;
    @apply tw-h-auto;
    @apply tw-pointer-events-none;
    bottom: -$home-stage-interlay-spacing-xs;
    right: -$home-stage-interlay-spacing-xs;

    @screen sm {
      width: $home-stage-interlay-width-sm;
    }

    @screen md {
      @apply tw-w-screen;
      min-width: $home-stage-interlay-min-width-md;
      bottom: -$home-stage-interlay-spacing-md;
      right: -$home-stage-interlay-spacing-md;
    }

    @screen lg {
      width: $home-stage-interlay-width-lg;
      bottom: -$home-stage-interlay-spacing-lg;
      right: -$home-stage-interlay-spacing-lg;
    }
  }
}

$shooting-time: 3000ms;

.night {
  @apply tw-absolute;
  @apply tw-h-full;
  @apply tw-w-full;
  @apply tw-rotate-45;
}

.shooting-star {
  @apply tw-absolute;
  @apply tw-h-0.5;
  @apply tw-left-1/2;
  @apply tw-top-1/2;
  /* stylelint-disable */
  background: linear-gradient(
    -45deg,
    rgba(204, 0, 51, 100%),
    rgba(255, 0, 0, 0%)
  );
  filter: drop-shadow(0 0 6px rgba(211, 133, 150, 100%));
  /* stylelint-enable */
  animation: tail $shooting-time ease-in-out infinite,
    shooting $shooting-time ease-in-out infinite;

  &::before {
    @apply tw-absolute;
    @apply tw-rounded-full;
    @apply tw-right-0;
    @apply tw-h-0.5;
    animation: shining $shooting-time ease-in-out infinite;
    content: '';
    top: calc(50% - 1px);
    transform: translateX(50%) rotateZ(45deg);
    /* stylelint-disable */
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0%),
      rgba(204, 0, 51, 100%),
      rgba(0, 0, 255, 0%)
    );
    /* stylelint-enable */
  }

  &::after {
    @apply tw-absolute;
    @apply tw-right-0;
    @apply tw-rounded-full;
    @apply tw-right-0;
    @apply tw-h-0.5;
    animation: shining $shooting-time ease-in-out infinite;
    content: '';
    top: calc(50% - 1px);
    transform: translateX(50%) rotateZ(-45deg);
    /* stylelint-disable */
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 255, 0%),
      rgba(204, 0, 51, 100%),
      rgba(0, 0, 255, 0%)
    );
    /* stylelint-enable */
  }

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      /* stylelint-disable */
      $delay: random(9999) + 0ms;
      top: calc(50% - #{random(400) - 200px});
      left: calc(50% - #{random(300) + 0px});
      /* stylelint-enable */
      animation-delay: $delay;

      &::before,
      &::after {
        animation-delay: $delay;
      }
    }
  }
}

@keyframes tail {
  0% {
    width: 0;
  }

  30% {
    width: 100px;
  }

  100% {
    width: 0;
  }
}

@keyframes shining {
  0% {
    width: 0;
  }

  50% {
    width: 30px;
  }

  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(300px);
  }
}

@keyframes sky {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(45 + 360deg);
  }
}
</style>
