<template>
  <div class="image-banner tw-grid-container tw-my-component-wide">
    <div class="image-banner__content">
      <div class="image-banner__headline-wrapper">
        <div class="image-banner__headline-text">
          <h2 class="image-banner__headline">{{ headline }}</h2>
          <h3 class="image-banner__subline">{{ subline }}</h3>
        </div>
      </div>
      <Richtext :richtext="richtext" class="image-banner__richtext" />
      <div class="image-banner__buttons">
        <NuxtDynamic
          v-for="item in buttons"
          :key="item._uid"
          class="image-banner__button"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div>
    </div>
    <div class="image-banner__media">
      <ResponsiveImage
        v-for="item in image"
        :key="item._uid"
        v-editable="item"
        class="image-banner__image"
        v-bind="item"
        :aspect-ratio="'3:2'"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
// import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Richtext, ResponsiveImage },
  props: {
    /**
     * headline of the media element rendred as h2
     */
    headline: {
      type: String,
      default: '',
    },
    /**
     * subline which will be rendered underneath the headline
     */
    subline: {
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
     * buttons appended to the richtext
     */
    buttons: {
      type: Array,
      default: () => [],
    },
    /**
     * Media item which will be rendered beside
     */
    image: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: 'contact_support',
    },
  },

  setup(props) {
    return {}
  },
})
</script>

<style lang="scss">
.image-banner {
  @apply tw-items-center;
  @apply tw-bg-pv-grey-32;
  @apply tw-rounded-lg;
  @apply tw-text-pv-white;

  &__headline-wrapper {
    @apply tw-flex;
    @apply tw-justify-between;
    @apply tw-mb-4;
  }

  // &__headline-icon {
  //   @apply tw-block;

  //   @screen md {
  //     @apply tw-hidden;
  //   }
  // }
  &__headline {
    @apply tw-text-pv-white;
  }

  &__subline {
    @apply tw-text-pv-white;
    @apply tw-text-lg;
    @apply tw-leading-7;
    @apply tw-font-normal;

    @screen lg {
      @apply tw-text-2xl;
      @apply tw-leading-9;
      @apply tw-font-normal;
    }
  }

  &__content {
    @apply tw-col-span-12;
    @apply tw-px-4;
    @apply tw-py-6;

    @screen md {
      @apply tw-col-span-5;
      @apply tw-px-6;
      @apply tw-py-8;
    }

    @screen lg {
      @apply tw-col-span-8;
      @apply tw-p-12;
    }
  }

  &__media {
    // @apply tw-hidden;
    position: relative;
    overflow: hidden;
    height: 100%;

    @screen md {
      // @apply tw-flex;
      // @apply tw-flex-col;
      // @apply tw-justify-center;
      // @apply tw-items-center;
      position: relative;
      overflow: hidden;
      height: 100%;
      @apply tw-bg-pv-red;
      @apply tw-rounded-r-lg;
      @apply tw-col-span-3;
    }

    @screen lg {
      position: relative;
      overflow: hidden;
      height: 100%;
      @apply tw-col-span-4;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    @apply tw-rounded-r-lg;

    // height: 100%;
    // width: 100%;
    // object-fit: contain;
  }

  &__buttons {
    @apply tw-mt-4;
    @apply tw-flex tw-flex-wrap;
    @apply tw-gap-x-6 tw-gap-y-4;
  }

  &__button {
    @apply tw-basis-full;

    &:nth-child(2) {
      @apply tw-justify-start;
    }

    @screen md {
      @apply tw-basis-0;
    }
  }
}
</style>
