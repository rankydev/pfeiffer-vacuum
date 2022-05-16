<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="bubble__wrapper"
    :class="
      position === 'right' ? 'bubble__wrapper--right' : 'bubble__wrapper--left'
    "
  >
    <h5 class="bubble__headline">{{ title }}</h5>
    <div v-editable="richtext" class="bubble__richtext" v-html="richtext"></div>
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
     * richtext element
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
  setup(props) {},
})
</script>

<style lang="scss">
/**
* Variables
*/

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
    height: 90px;
    width: 90px;

    @screen md {
      height: 144px;
      width: 144px;
    }

    @screen lg {
      height: 180px;
      width: 180px;
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
      left: unset;
      bottom: 144px;
      right: 240px;
    }

    @screen lg {
      left: unset;
      bottom: unset;
      top: 134px;
      right: 300px;
    }
  }

  &__headline {
    @apply tw-text-pv-white;
    @apply tw-leading-4;
    font-size: 10px;

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
      font-size: 10px;

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
