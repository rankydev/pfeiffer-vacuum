<template>
  <ContentWrapper breakout>
    <Carousel
      class="carousel"
      :slides="slides"
      :settings="{ ...defaultSettings, ...settings }"
    />
  </ContentWrapper>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Carousel from '~/components/atoms/Carousel/Carousel'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  name: 'WideCarousel',
  components: {
    ContentWrapper,
    Carousel,
  },
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
    settings: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const defaultSettings = {
      speed: 300,
      infinite: false,
      initialSlide: 0,
      slidesToShow: 6,
      responsive: [
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }

    return {
      defaultSettings,
    }
  },
})
</script>

<style lang="scss">
.carousel {
  @apply tw-px-4;
  @apply tw-overflow-hidden;

  @screen md {
    @apply tw-px-6;
  }

  @screen lg {
    @apply tw-px-8;
    padding-left: max(
      calc((100vw - theme('container.screens.xl')) / 2 + theme('spacing.8')),
      theme('spacing.8')
    );
  }

  .slick-list {
    @apply tw-overflow-visible;
  }
}
</style>
