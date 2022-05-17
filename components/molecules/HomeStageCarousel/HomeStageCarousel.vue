<template>
  <Carousel
    :settings="settings"
    :slides="slides"
    is-wide
    is-home-stage
    :infinite="infinite"
    :autoplay="autoplay"
  />
</template>

<script>
import Carousel from '@/components/atoms/Carousel/Carousel'
export default {
  name: 'HomeStageCarousel',
  components: { Carousel },
  props: {
    slides: {
      type: Array,
      default: () => [],
      required: true,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const settings = {
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
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
