<template>
  <div v-editable="(headline, teaserText, buttons)" class="homestage-content">
    <h2 v-if="headline" class="homestage-content__headline">
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
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-grow;
  @apply tw-px-4;
  @apply tw-py-6;
  @apply tw-z-10;

  @screen md {
    @apply tw-px-10;
    @apply tw-py-14;
  }

  @screen lg {
    @apply tw-pl-36;
    @apply tw-pr-4;
    @apply tw-py-0;
    @apply tw-justify-center;
    width: 70%;
  }

  &__headline,
  &__description {
    @apply tw-text-pv-white;
  }

  &__headline {
    @apply tw-leading-9;
    @apply tw-font-bold;
    font-size: 28px;

    @screen md {
      @apply tw-text-5xl;
      line-height: 56px;
    }

    @screen lg {
      font-size: 56px;
      line-height: 64px;
    }
  }

  &__description {
    @apply tw-mt-2;
    @apply tw-font-normal;
    @apply tw-text-sm;
    @apply tw-leading-6;

    @screen md {
      @apply tw-mt-4;
      @apply tw-text-base;
    }

    @screen lg {
      @apply tw-text-xl;
      @apply tw-leading-7;
    }
  }

  &__buttons {
    @apply tw-mt-4;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-4;

    @screen md {
      @apply tw-mt-6;
      @apply tw-flex-row;
    }
  }
}
</style>
