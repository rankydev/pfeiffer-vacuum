<template>
  <Carousel
    :settings="settings"
    :slides="slides"
    is-wide
    :infinite="infinite"
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    class="home-stage-carousel"
  />
</template>

<script>
import Carousel from '~/components/atoms/Carousel/Carousel'
export default {
  name: 'HomeStageCarousel',
  components: { Carousel },
  props: {
    /**
     * Slider items
     */
    slides: {
      type: Array,
      default: () => [],
      required: true,
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
  setup() {
    const settings = {
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: -1,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }

    return {
      settings,
    }
  },
}
</script>

<style lang="scss">
.home-stage-carousel {
  .slick-slider {
    padding: 0;

    .slick-track {
      @apply tw-gap-0;

      .slick-slide {
        min-width: 100vw;

        .homestage {
          // overwrite slick slide elements style
          display: flex !important;
        }
      }
    }
  }
}
</style>
