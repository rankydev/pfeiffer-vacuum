<template>
  <div v-editable="(headline, buttons)" class="home-stage-slide-content">
    <h2 v-if="headline" class="home-stage-slide-content__headline tw-hero">
      {{ headline }}
    </h2>

    <Richtext
      :richtext="richtext"
      class="home-stage-slide-content__description tw-teaser"
    />

    <div v-if="buttons.length" class="home-stage-slide-content__buttons">
      <Button
        v-for="button in buttons"
        :key="button._uid"
        v-bind="button"
        :class="{
          'home-stage-slide-content__button--hidden': blendOutBtnMobile,
        }"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  name: 'HomeStageSlideContent',
  components: { Button, Richtext },
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
    /**
     * Can be used to blend out the second button on mobile
     */
    blendOutBtnMobile: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.home-stage-slide-content {
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-grow;
  @apply tw-px-4;
  @apply tw-py-6;
  @apply tw-min-w-[50%];

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

  &__button--hidden {
    &:nth-child(2) {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
      }
    }
  }
}
</style>
