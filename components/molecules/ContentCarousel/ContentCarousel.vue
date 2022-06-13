<template>
  <div v-editable="slides" class="content-carousel">
    <div class="content-carousel__content">
      <h2>{{ headline }}</h2>
      <NuxtDynamic
        v-for="btn in button"
        :key="btn._uid"
        v-bind="btn"
        :name="btn.uiComponent || btn.component"
      />
    </div>
    <Carousel v-bind="carouselData">
      <template #slides>
        <!-- @slot carousel slides -->
        <slot name="slides" />
      </template>
    </Carousel>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Carousel from '@/components/atoms/Carousel/Carousel'

export default defineComponent({
  name: 'ContentCarousel',
  components: {
    Carousel,
  },
  props: {
    /**
     * Headline of the carousel
     */
    headline: {
      type: String,
      default: '',
    },

    /**
     * Button which will be displayed above the carousel
     */
    button: {
      type: Array,
      default: () => [],
    },
    /**
     * Slider items
     */
    slides: {
      type: Array,
      default: () => [],
    },

    /**
     * enables/disables wide mode of carousel (breakout of ContentWrapper)
     */
    isWide: {
      type: Boolean,
      default: false,
    },
    /**
     * optional carousel settings for manual use
     */
    settings: {
      type: Object,
      default: () => ({}),
    },
    /**
     * enables/ disables infinite wrap around items on slider
     */
    infinite: {
      type: Boolean,
      default: false,
    },
    /**
     * enables/ disables autoplay
     */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /**
     * autoplay Speed in milliseconds, retrieves string from Storyblok
     */
    autoplaySpeed: {
      type: String,
      default: '5000',
    },
  },
  setup(props) {
    const carouselData = {
      slides: props.slides,
      isWide: props.isWide,
      settings: props.settings,
      infinite: props.infinite,
      autoplay: props.autoplay,
      autoplaySpeed: props.autoplaySpeed,
    }

    return {
      carouselData,
    }
  },
})
</script>
<style lang="scss">
.content-carousel {
  @apply tw-bg-pv-grey-96;
  @apply tw-py-12;

  &__content {
    @apply tw-mx-auto;
    @apply tw-container;
    @apply tw-px-0;
    @apply tw-flex;
    @apply tw-flex-wrap;

    h2 {
      @apply tw-grow;
      @apply tw-w-full;
      @apply tw-block;
    }

    .button {
      @apply tw-grow;
      @apply tw-justify-end;
    }

    @screen md {
      @apply tw-flex-nowrap;
      @apply tw-justify-between;
      @apply tw-items-center;
      @apply tw-pb-4;
    }
  }
}
</style>
