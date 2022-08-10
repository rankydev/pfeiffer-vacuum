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
        <div>
          <NuxtDynamic
            v-for="item in buttons"
            :key="item._uid"
            class="image-banner__button"
            v-bind="item"
            :name="item.uiComponent || item.component"
          />
        </div>
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
  },

  setup(props) {
    return {}
  },
})
</script>

<style lang="scss">
.image-banner {
  margin-top: 42px;
  @apply tw-overflow-hidden;
  @apply tw-text-pv-white;
  @apply tw-bg-pv-grey-32;
  @apply tw-rounded-lg;

  @screen md {
    @apply tw-items-center;
  }

  &__headline-wrapper {
    @apply tw-flex;
    @apply tw-justify-between;
    @apply tw-mb-4;
  }

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
    @apply tw-p-8;
    @apply tw-col-span-8;
    grid-row: 2;

    @screen md {
      @apply tw-col-span-4;
      @apply tw-pl-16;
      grid-row: initial;
    }

    @screen lg {
      @apply tw-col-span-8;

      @apply tw-pl-16;
    }
  }

  &__media {
    @apply tw-col-span-8;
    grid-row: 1;

    @screen md {
      @apply tw-col-span-4;
      grid-row: initial;
    }

    @screen lg {
      @apply tw-col-span-4;
      @apply tw-rounded-t-lg;
    }
  }

  &__image {
    @apply tw-rounded-t-lg;
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
