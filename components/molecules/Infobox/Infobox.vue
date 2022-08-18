<template>
  <div class="infobox tw-grid-container tw-my-component-wide">
    <div class="infobox__content">
      <!-- <div class="infobox__headline-wrapper">
        <div class="infobox__headline-text">
          <h2 class="infobox__headline"></h2>
          <h3 class="infobox__subline">Käse</h3>
        </div>
      </div> -->
      <p>Should be translateable text</p>
      <!-- <div class="infobox__buttons">
        <NuxtDynamic
          v-for="item in buttons"
          :key="item._uid"
          class="infobox__button"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </div> -->
    </div>
    <div class="infobox__media">
      <Icon :icon="icon" size="large" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    // /**
    //  * headline of the media element rendred as h2
    //  */
    // headline: {
    //   type: String,
    //   default: '',
    // },
    // /**
    //  * subline which will be rendered underneath the headline
    //  */
    // subline: {
    //   type: String,
    //   default: '',
    // },
    // /**
    //  * richtext element
    //  */
    // richtext: {
    //   type: String,
    //   default: '',
    // },
    // /**
    //  * buttons appended to the richtext
    //  */
    buttons: {
      type: Array,
      default: () => [],
    },
    /**
     * icon displayed in the red field on the right side
     */
    icon: {
      type: String,
      default: 'info',
    },
  },
})
</script>

<style lang="scss">
.infobox {
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-lg;
  @apply tw-text-pv-white;

  // &__headline-wrapper {
  //   @apply tw-flex tw-justify-between;
  //   @apply tw-mb-4;
  // }
  // &__headline {
  // }
  // &__subline {
  //   @apply tw-text-lg;
  //   @apply tw-leading-7;
  //   @apply tw-font-normal;

  //   @screen lg {
  //     @apply tw-text-2xl;
  //     @apply tw-leading-9;
  //     @apply tw-font-normal;
  //   }
  // }
  &__content {
    @apply tw-col-span-3;
    @apply tw-p-4;
    @apply tw-text-pv-black;

    @screen md {
      @apply tw-col-span-7;
    }

    @screen lg {
      @apply tw-col-span-10;
      @apply tw-p-6;
    }
  }

  &__media {
    @apply tw-flex tw-flex-col tw-justify-center tw-items-center;
    @apply tw-h-full;
    @apply tw-rounded-r-lg;
    @apply tw-bg-pv-grey-80;
    @apply tw-col-span-1;

    @screen md {
      @apply tw-col-span-1;
    }

    @screen lg {
      @apply tw-col-span-2;
    }
  }

  // &__buttons {
  //   @apply tw-mt-4;
  //   @apply tw-flex tw-flex-wrap;
  //   @apply tw-gap-x-6 tw-gap-y-4;
  // }

  // &__button {
  //   @apply tw-basis-full;

  //   &:nth-child(2) {
  //     @apply tw-justify-start;
  //   }

  //   @screen md {
  //     @apply tw-basis-0;
  //   }
  // }
}
</style>
