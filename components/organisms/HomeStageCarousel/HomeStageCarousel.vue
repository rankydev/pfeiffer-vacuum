<template>
  <Carousel
    v-if="slides.length"
    :settings="settings"
    is-wide
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    class="home-stage-carousel"
  >
    <template #slides>
      <HomeStageModule
        v-for="slide in slides"
        :key="slide._uid"
        v-editable="slide"
        v-bind="slide"
      />
    </template>
  </Carousel>
</template>

<script>
import Carousel from '~/components/atoms/Carousel/Carousel'
import HomeStageModule from '~/components/organisms/HomeStageCarousel/HomeStageModule/HomeStageModule'
export default {
  name: 'HomeStageCarousel',
  components: { HomeStageModule, Carousel },
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
  setup(props) {
    const settings = {
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: -1,
      infinite: props.infinite,
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
