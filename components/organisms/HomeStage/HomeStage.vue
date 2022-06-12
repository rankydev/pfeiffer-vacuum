<template>
  <HomeStageSlide
    v-if="slides.length <= 1"
    :stage-content="slides[0].stageContent"
    :image="slides[0].image"
    :interlay="slides[0].interlay"
    :bubble="slides[0].bubble"
  />
  <Carousel
    v-else
    :settings="settings"
    :slides="slides"
    is-wide
    :autoplay="autoplay"
    :autoplay-speed="autoplaySpeed"
    class="home-stage"
  />
</template>

<script>
import Carousel from '~/components/atoms/Carousel/Carousel'
import HomeStageSlide from '~/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide'
import tailwindconfig from '~/tailwind.config'
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HomeStage',
  components: { Carousel, HomeStageSlide },
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
      default: true,
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
    const tailwindConfigScreens = tailwindconfig.theme.screens

    /**
     * split string of tailwind breakpoint, so lib aknowledges breakpoint
     */
    const splitBreakpointString = (breakpointString) => {
      const split = breakpointString.split('px')

      return parseInt(split[0])
    }

    const settings = computed(() => ({
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: -1,
      infinite: props.infinite,
      responsive: [
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.lg),
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.md),
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    }))

    return {
      settings,
    }
  },
})
</script>

<style lang="scss">
.home-stage {
  .slick-slider {
    padding: 0;

    .slick-track {
      @apply tw-gap-0;

      .slick-slide {
        min-width: 100vw;

        .home-stage-slide {
          // overwrite slick slide elements style
          display: flex !important;
        }
      }
    }
  }
}
</style>
