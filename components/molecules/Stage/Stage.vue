<template>
  <div v-editable="(image, stageContent)" class="stage">
    <div class="stage__inner-wrapper">
      <StageContent
        v-if="stageContent.length"
        class="stage__content-block"
        v-bind="stageContent[0]"
      />
      <ResponsiveImage
        v-if="(image || {}).originalFilename"
        :image="image"
        class="stage__image"
        :class="`stage__image--${stageContent.length ? 'with-text' : 'full'}`"
        aspect-ratio="16:9"
      />
    </div>
  </div>
</template>

<script>
import StageContent from '~/components/molecules/Stage/StageContent/StageContent.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default {
  name: 'Stage',
  components: {
    StageContent,
    ResponsiveImage,
  },
  props: {
    /**
     * An image wich if displayed full width if no stage content is defined.
     * If a stage content is defined it is displayed on the right side
     */
    image: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * The stage content which can be added optionally
     */
    stageContent: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.stage {
  @apply tw-bg-pv-grey-16;

  &__inner-wrapper {
    @apply tw-flex;
    @apply tw-flex-wrap-reverse;
    @apply tw-px-0;

    @screen md {
      @apply tw-flex-nowrap;
      @apply tw-flex-row;
    }
  }

  &__content-block {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
    }
  }

  &__image {
    &--with-text {
      @apply tw-w-full;
      @apply tw-object-cover;

      @screen md {
        @apply tw-w-1/2;
        @apply tw-object-contain;
      }
    }

    &--full {
      @apply tw-w-full;
      @apply tw-object-cover;
    }

    .responsive-image {
      img {
        @apply tw-w-full;
        @apply tw-rounded-none;
        @apply tw-object-cover;
        height: 180px;

        @screen md {
          height: 372px;
        }

        @screen lg {
          height: 400px;
        }

        @screen xl {
          // growing proportionally to width of screen
          height: 28vw;
        }
      }
    }
  }
}
</style>
