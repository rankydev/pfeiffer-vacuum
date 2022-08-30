<template>
  <div
    v-editable="(headline, subline, teaserText, buttons)"
    class="stage-content"
  >
    <h1 v-if="headline" class="stage-content__headline">
      {{ headline }}
    </h1>

    <p v-if="subline" class="stage-content__subline tw-teaser">
      {{ subline }}
    </p>

    <p v-if="teaserText" class="stage-content__description">
      {{ teaserText }}
    </p>

    <div v-if="buttons.length" class="stage-content__buttons">
      <Button
        v-for="button in buttons"
        :key="button._uid"
        class="stage-content__button"
        v-bind="button"
      />
    </div>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button/Button.vue'

export default {
  name: 'StageContent',
  components: { Button },
  props: {
    /**
     * The headline of the stage
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * subline of the stage
     */
    subline: {
      type: String,
      default: '',
    },
    /**
     * Teaster test of the stage
     */
    teaserText: {
      type: String,
      default: '',
    },
    /**
     * Up to 2 buttons can be added optional
     */
    buttons: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.stage-content {
  @apply tw-bg-pv-grey-16;
  @apply tw-px-4;
  @apply tw-py-6;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-justify-center;

  @screen md {
    @apply tw-px-6;
  }

  @screen lg {
    @apply tw-px-8;
  }

  @screen xl {
    @apply tw-px-16;
  }

  &__headline,
  &__subline,
  &__description {
    @apply tw-text-pv-white;
  }

  &__subline,
  &__description {
    @apply tw-mt-2;
  }

  &__buttons {
    @apply tw-mt-8;
    @apply tw-flex;
    @apply tw-flex-wrap;
    @apply tw-gap-4;

    a {
      @apply tw-w-full tw-justify-center;
    }

    @screen md {
      a {
        width: unset;
      }
    }
  }
}
</style>
