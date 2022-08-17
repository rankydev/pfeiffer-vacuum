<template>
  <div class="image-banner">
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
        aspect-ratio="3:2"
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
  @apply tw-text-pv-white;
  @apply tw-overflow-hidden;
  @apply tw-bg-pv-grey-32;
  @apply tw-rounded-lg;
  @apply tw-flex;
  @apply tw-flex-wrap-reverse;
  @apply tw-px-0;

  @screen md {
    @apply tw-flex-nowrap;
    @apply tw-flex-row;
    max-height: 400px;
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

  &__richtext {
    @apply tw-overflow-auto;
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

  &__button--mobile {
    @apply tw-flex;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__content {
    @apply tw-m-8;
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-justify-center;
      max-height: 320px;
    }

    @screen lg {
      @apply tw-w-2/3;
      max-height: 340px;
    }
  }

  &__media {
    @apply tw-w-full;
    @apply tw-object-cover;

    @screen md {
      @apply tw-w-1/2;
      @apply tw-object-contain;
    }

    @screen lg {
      @apply tw-w-1/3;
      @apply tw-object-contain;
    }

    .responsive-image {
      img {
        @apply tw-w-full;
        @apply tw-rounded-none;
        @apply tw-object-cover;
        height: 385px;

        @screen md {
          height: 385px;
        }

        @screen lg {
          height: 530px;
        }

        @screen xl {
          // growing proportionally to width of screen
          height: 28vw;
        }
      }
    }
  }
}
</style>
