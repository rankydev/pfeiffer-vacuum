<template>
  <div v-editable="(headline, buttons)" class="home-stage-slide-content">
    <h2 v-if="headline" class="home-stage-slide-content__headline tw-hero">
      {{ headline }}
    </h2>

    <NuxtDynamic
      v-for="item in richtext"
      :key="item._uid"
      class="home-stage-slide-content__description tw-teaser"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />

    <div v-if="buttons.length" class="home-stage-slide-content__buttons">
      <Button v-for="button in buttons" :key="button._uid" v-bind="button" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/atoms/Button/Button.vue'

export default {
  name: 'HomeStageSlideContent',
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
     * richtext element, containing the description
     */
    richtext: {
      type: Array,
      default: () => [],
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
.home-stage-slide-content {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-grow;
  @apply tw-px-4;
  @apply tw-py-6;
  @apply tw-z-10;
  min-width: 50%;

  @screen md {
    @apply tw-px-10;
    @apply tw-py-14;
  }

  @screen lg {
    @apply tw-pl-36;
    @apply tw-pr-4;
    @apply tw-py-0;
    @apply tw-justify-center;
  }

  &__headline,
  &__description {
    @apply tw-text-pv-white;
  }

  &__headline {
    @apply tw-font-bold;
  }

  &__description {
    p {
      @apply tw-mt-2;
      @apply tw-font-normal;
      @apply tw-text-sm;
      @apply tw-leading-6;

      @screen md {
        @apply tw-mt-4;
        @apply tw-text-base;
      }

      @screen lg {
        @apply tw-text-lg;
        @apply tw-leading-7;
      }
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
