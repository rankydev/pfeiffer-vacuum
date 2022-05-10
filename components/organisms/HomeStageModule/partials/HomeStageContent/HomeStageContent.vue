<template>
  <div v-editable="(headline, teaserText, buttons)" class="homestage-content">
    <h2 v-if="headline" class="homestage-content__headline tw-hero">
      {{ headline }}
    </h2>

    <p v-if="teaserText" class="homestage-content__description tw-teaser">
      {{ teaserText }}
    </p>

    <div v-if="buttons.length" class="homestage-content__buttons">
      <Button v-for="button in buttons" :key="button._uid" v-bind="button" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button/Button.vue'

export default {
  name: 'HomeStageContent',
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
.homestage-content {
  @apply tw-grow;
  @apply tw-px-4;
  @apply tw-py-6;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-z-10;

  @screen md {
    @apply tw-px-6;
  }

  @screen lg {
    @apply tw-px-8;
    @apply tw-justify-center;
    width: 50%;
  }

  @screen xl {
    @apply tw-px-16;
  }

  &__headline,
  &__description {
    @apply tw-text-pv-white;
  }

  &__description {
    @apply tw-mt-2;
  }

  &__buttons {
    @apply tw-mt-8;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-4;

    @screen md {
      @apply tw-flex-row;
    }
  }
}
</style>
