<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="bubble__wrapper" :class="`bubble__wrapper--${position}`">
    <h5 class="bubble__headline">{{ title }}</h5>
    <Richtext :richtext="richtext" class="bubble__richtext" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'

export default defineComponent({
  components: { Richtext },
  props: {
    /**
     * The title of the component
     */
    title: {
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
     * The position of the element
     */
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right'].includes(val),
    },
  },
})
</script>

<style lang="scss">
/**
* Variables
*/
$bubble-height-xs: 90px;
$bubble-width-xs: $bubble-height-xs;
$bubble-height-md: 144px;
$bubble-width-md: $bubble-height-md;
$bubble-height-lg: 180px;
$bubble-width-lg: $bubble-height-lg;
$bubble-text-xxs: 10px;
$left-bubble-bottom-md: 144px;
$left-bubble-left-md: 50%;
$left-bubble-right-md: unset;
$left-bubble-top-lg: 80px;
$left-bubble-bottom-lg: unset;
$left-bubble-left-lg: 66%;
$left-bubble-right-lg: unset;
$left-bubble-left-xl: 0%;
$left-bubble-right-xl: unset;
$left-bubble-top-xl: 160px;
$right-bubble-top-xl: 520px;
$right-bubble-right-xl: 160px;

.bubble {
  &__wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-absolute;
    @apply tw-rounded-full;
    @apply tw-bg-pv-red;
    @apply tw-px-1;
    @apply tw-text-pv-white;
    @apply tw-transition-all;
    @apply tw-duration-500;
    height: $bubble-height-xs;
    width: $bubble-width-xs;

    @screen md {
      height: $bubble-height-md;
      width: $bubble-width-md;
    }

    @screen lg {
      height: $bubble-height-lg;
      width: $bubble-width-lg;
    }
  }

  &__wrapper--right {
    @apply tw-bottom-6;
    @apply tw-right-6;

    @screen md {
      @apply tw-bottom-16;
      @apply tw-right-16;
    }

    @screen lg {
      @apply tw-bottom-20;
      @apply tw-right-20;
    }

    @screen xl {
      top: $right-bubble-top-xl;
      right: $right-bubble-right-xl;
    }
  }

  &__wrapper--left {
    @apply tw-bottom-12;
    @apply tw-left-6;

    @screen md {
      bottom: $left-bubble-bottom-md;
      left: $left-bubble-left-md;
      right: $left-bubble-right-md;
    }

    @screen lg {
      top: $left-bubble-top-lg;
      bottom: $left-bubble-bottom-lg;
      left: $left-bubble-left-lg;
      right: $left-bubble-right-lg;
    }

    @screen xl {
      left: $left-bubble-left-xl;
      right: $left-bubble-right-xl;
      top: $left-bubble-top-xl;
    }
  }

  &__headline {
    @apply tw-text-center;
    @apply tw-break-all;
    @apply tw-text-pv-white;
    @apply tw-leading-4;
    @apply tw-transition;
    @apply tw-ease-in;
    @apply tw-duration-700;
    font-size: $bubble-text-xxs;

    @screen md {
      @apply tw-text-base;
      @apply tw-leading-6;
    }

    @screen lg {
      @apply tw-text-lg;
      @apply tw-leading-7;
    }
  }

  &__richtext {
    @apply tw-text-center;
    @apply tw-break-all;

    p {
      @apply tw-leading-4;
      font-size: $bubble-text-xxs;

      @screen md {
        @apply tw-text-sm;
        @apply tw-leading-6;
      }

      @screen lg {
        @apply tw-text-base;
        @apply tw-leading-7;
      }
    }
  }
}
</style>
