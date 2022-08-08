<template>
  <div class="help-container tw-grid-container tw-my-component-wide">
    <div class="help-container__content">
      <div class="help-container__headline-wrapper">
        <div class="help-container__headline-text">
          <h2 class="help-container__headline">{{ headline }}</h2>
          <h3 class="help-container__subline">{{ subline }}</h3>
        </div>
        <div class="help-container__headline-icon">
          <Icon :icon="icon" size="xlarge" />
        </div>
      </div>
      <Richtext :richtext="richtext" class="help-container__richtext" />
      <div class="help-container__buttons">
        <NuxtDynamic
          v-for="item in buttons"
          :key="item._uid"
          class="help-container__button"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div>
    </div>
    <div class="help-container__media">
      <Icon :icon="icon" size="xxlarge" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Richtext, Icon },
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
     * icon displayed in the red field on the right side
     */
    icon: {
      type: String,
      default: 'contact_support',
    },
  },
})
</script>

<style lang="scss">
.help-container {
  @apply tw-bg-pv-grey-32;
  @apply tw-rounded-lg;
  @apply tw-text-pv-white;

  &__headline-wrapper {
    @apply tw-flex tw-justify-between;
    @apply tw-mb-4;
  }

  &__headline-icon {
    @apply tw-block;

    @screen md {
      @apply tw-hidden;
    }
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
    @apply tw-col-span-12;
    @apply tw-px-4;
    @apply tw-py-6;

    @screen md {
      @apply tw-col-span-6;
      @apply tw-px-6;
      @apply tw-py-8;
    }

    @screen lg {
      @apply tw-col-span-9;
      @apply tw-p-12;
    }
  }

  &__media {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex tw-flex-col tw-justify-center tw-items-center;
      @apply tw-bg-pv-red;
      @apply tw-h-full;
      @apply tw-rounded-r-lg;
      @apply tw-col-span-2;
    }

    @screen lg {
      @apply tw-col-span-3;
    }
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
