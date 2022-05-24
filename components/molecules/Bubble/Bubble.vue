<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="bubble__wrapper" :class="`bubble__wrapper--${position}`">
    <h5 class="bubble__headline">{{ title }}</h5>
    <NuxtDynamic
      v-for="item in richtext"
      :key="item._uid"
      v-bind="item"
      class="bubble__richtext"
      :component="item.uiComponent || item.component"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
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
      type: Array,
      default: () => [],
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
$bubble-bottom-md: 144px;
$bubble-left-md: unset;
$bubble-right-md: 240px;
$bubble-top-lg: 134px;
$bubble-bottom-lg: unset;
$bubble-left-lg: unset;
$bubble-right-lg: 300px;
$bubble-text-xxs: 10px;

.bubble {
  &__wrapper {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-absolute;
    @apply tw-absolute;
    @apply tw-rounded-full;
    @apply tw-bg-pv-red;
    @apply tw-px-1;
    @apply tw-text-pv-white;
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
  }

  &__wrapper--left {
    @apply tw-bottom-12;
    @apply tw-left-6;

    @screen md {
      bottom: $bubble-bottom-md;
      left: $bubble-left-md;
      right: $bubble-right-md;
    }

    @screen lg {
      top: $bubble-top-lg;
      bottom: $bubble-bottom-lg;
      left: $bubble-left-lg;
      right: $bubble-right-lg;
    }
  }

  &__headline {
    @apply tw-text-pv-white;
    @apply tw-leading-4;
    font-size: $bubble-text-xxs;

    @screen md {
      @apply tw-text-base;
      @apply tw-leading-6;
    }

    @screen lg {
      @apply tw-text-xl;
      @apply tw-leading-7;
    }
  }

  &__richtext {
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
