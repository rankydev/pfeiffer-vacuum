<template>
  <div v-editable="stageContent" class="stage">
    <div class="stage__inner-wrapper">
      <HomeStageContent
        v-if="stageContent.length"
        class="stage__content-block"
        v-bind="stageContent[0]"
      />
    </div>
  </div>
</template>

<script>
import HomeStageContent from '~/components/organisms/HomeStageModule/HomeStageContent/HomeStageContent.vue'

export default {
  name: 'HomeStageModule',
  components: {
    HomeStageContent,
  },
  props: {
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
