<template>
  <div v-editable="(image, stageContent)" class="stage">
    <StageContent
      v-if="stageContent.length"
      class="stage__content-block"
      v-bind="stageContent[0]"
    />
    <NuxtImg
      v-if="(image || {}).originalFilename"
      preload
      class="stage__image"
      :class="`stage__image--${stageContent.length ? 'with-text' : 'full'}`"
      :alt="image.alt"
      :src="image.originalFilename"
    />
  </div>
</template>

<script>
import StageContent from '~/components/molecules/Stage/StageContent/StageContent.vue'

export default {
  name: 'Stage',
  components: {
    StageContent,
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
  @apply tw-flex;
  @apply tw-flex-wrap-reverse;
  @apply tw-bg-pv-grey-16;

  @screen md {
    @apply tw-flex-nowrap;
    @apply tw-flex-row;
  }

  &__content-block {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
    }
  }

  &__image {
    height: 180px;

    @screen md {
      height: 372px;
    }

    @screen lg {
      height: 400px;
    }

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
  }
}
</style>
