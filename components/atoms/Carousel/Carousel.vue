<template>
  <ContentWrapper
    v-bind="contentWrapperProps"
    ref="wrapper"
    v-editable="(infinite, isWide)"
    class="carousel"
  >
    <VueSlickCarousel
      ref="carousel"
      v-bind="{ ...defaultSettings, ...settings }"
      :infinite="infiniteSetting"
      :autoplay="autoplay"
      :autoplay-speed="autoplaySpeedMilliseconds"
      class="carousel__slider"
      :class="{ 'carousel__slider--wide': isBreakout }"
    >
      <!-- @slot carousel slides -->
      <slot name="slides" />
      <!-- empty element is needed, so the slider doesn't throw an error  -->
      <div />

      <template #prevArrow="{ currentSlide }">
        <Button
          class="slider__prev"
          :class="{
            'slider__prev--hide': isFirstSlide(currentSlide),
          }"
          variant="secondary"
          icon="arrow_back"
          cutaway="right"
        />
      </template>
      <template #nextArrow="{ currentSlide, slideCount }">
        <Button
          class="slider__next"
          :class="{
            'slider__next--hide': isLastSlide(currentSlide, slideCount),
          }"
          variant="secondary"
          icon="arrow_forward"
          cutaway="left"
        />
      </template>
    </VueSlickCarousel>
  </ContentWrapper>
</template>
<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel/src/VueSlickCarousel.vue'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import tailwindconfig from '~/tailwind.config'
import { useResizeObserver } from '@vueuse/core'

export default defineComponent({
  name: 'Carousel',
  components: {
    Button,
    VueSlickCarousel,
    ContentWrapper,
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
     * autoplay Speed in seconds, retrieves string from Storyblok
     */
    autoplaySpeed: {
      type: String,
      default: '5',
    },
  },
  setup(props) {
    const tailwindConfigScreens = tailwindconfig.theme.screens

    /**
     * Check if carousel is breakout (wide mode)
     */
    const { app } = useContext()
    const isBreakout = computed(
      () => !app.$breakpoints.isDesktop.value || props.isWide
    )

    /**
     * Get object by reference
     */
    const wrapper = ref(null)
    const carousel = ref(null)

    /**
     * slider controls
     */
    const visibleSlides = ref(0)

    const isFirstSlide = (current) => current === 0
    const isLastSlide = (current, total) =>
      current >= Math.ceil(total - visibleSlides.value)

    useResizeObserver(wrapper, () => {
      const innerSlider = carousel.value.$refs.innerSlider
      if (visibleSlides.value !== innerSlider?.slidesToShow) {
        visibleSlides.value = innerSlider?.slidesToShow
      }
    })

    /**
     * Set computed property infinite
     * carousel in wide mode (breakout) should never be infinite
     * otherwise set infinite based on setting
     */
    const infiniteSetting = computed(() => {
      //settings should override values
      if (props.settings?.infinite) return props.settings?.infinite
      if (isBreakout.value) return false

      return props.infinite
    })

    /**
     * set ContentWrapper props based on isBreakout value
     * ContentWrapper should have noPadding when the carousel will be rendered normally
     */
    const contentWrapperProps = computed(() => ({
      breakout: isBreakout.value,
      noPadding: !isBreakout.value,
    }))

    /**
     * slidesToShow should be set to 6 for wide mode carousels on desktop
     * otherwise the carousel should only show 4 slides
     */
    const slidesToShow = computed(() => (isBreakout.value ? 6 : 4))

    /**
     * split string of tailwind breakpoint, so lib aknowledges breakpoint
     */
    const splitBreakpointString = (breakpointString) => {
      const split = breakpointString.split('px')

      return parseInt(split[0])
    }

    /**
     * convert autoplaySpeed from seconds into milliseconds
     */
    const autoplaySpeedMilliseconds = Math.ceil(
      parseInt(props.autoplaySpeed) * 1000
    )

    const defaultSettings = {
      adaptiveHeight: true,
      arrows: true,
      edgeFriction: 0.35,
      pauseOnFocus: true,
      speed: 300,
      slidesToShow: slidesToShow.value,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.lg),
          settings: {
            slidesToShow: 3,
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
    }

    return {
      wrapper,
      carousel,
      isBreakout,
      contentWrapperProps,
      defaultSettings,
      isFirstSlide,
      isLastSlide,
      infiniteSetting,
      autoplaySpeedMilliseconds,
    }
  },
})
</script>

<style lang="scss">
.slick-slider {
  @apply tw-relative;
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

.slick-list {
  @apply tw-relative;
  @apply tw-overflow-hidden;

  &:focus {
    @apply tw-outline-none;
  }

  &.dragging {
    @apply tw-cursor-pointer;
  }
}

.slick-track {
  @apply tw-relative;
  @apply tw-top-0 tw-left-0;
  @apply tw-flex;
  @apply tw-gap-4;
  font-size: 0;
  line-height: 0;
}

.slick-slide {
  @apply tw-hidden;
  @apply tw-h-full;
  min-height: 1px;

  &.dragging img {
    @apply tw-pointer-events-none;
  }
}

.slick-loading {
  .slick-track,
  .slick-slide {
    @apply tw-invisible;
  }
}

.slick-initialized {
  .slick-slide {
    @apply tw-block;
  }
}

.slick-dots {
  @apply tw-w-full;
  @apply tw-list-none;
  @apply tw-text-center;
  @apply tw-m-0 tw-p-0;
  @apply tw-mt-3;

  li {
    @apply tw-relative;
    @apply tw-inline-block;
    @apply tw-w-4;
    @apply tw-h-4;
    @apply tw-m-0;
    @apply tw-p-0;

    button {
      @apply tw-w-4;
      @apply tw-h-4;
      @apply tw-cursor-pointer;
      @apply tw-text-pv-transparent;
      @apply tw-outline-none;
      font-size: 0;
      line-height: 0;
    }

    &::before {
      @apply tw-absolute;
      @apply tw-top-0 tw-left-0;
      @apply tw-text-base tw-text-center;
      @apply tw-text-pv-grey-80;
      @apply tw-leading-3;
      @apply tw-pb-1;
      @apply tw-w-4 tw-h-4;
      content: '■';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    &:hover,
    &:focus {
      @apply tw-outline-none;
    }

    &.slick-active button::before {
      @apply tw-text-pv-red;
      @apply tw-opacity-100;
    }
  }
}
</style>

<style lang="scss">
.carousel {
  &__slider {
    &--wide {
      @apply tw-px-4;
      @apply tw-overflow-x-clip;

      @screen md {
        @apply tw-px-6;
      }

      @screen lg {
        @apply tw-px-8;
        padding-left: max(
          calc(
            (100vw - theme('container.screens.xl')) / 2 + theme('spacing.8')
          ),
          theme('spacing.8')
        );
      }

      .slick-list {
        @apply tw-overflow-visible;
      }
    }

    // TODO: remove this
    .teaser-card {
      @apply tw-h-full;
    }
  }
}

.slider {
  &__prev,
  &__next {
    @apply tw-absolute;
    @apply tw-top-1/2;
    @apply tw-z-10;
    @apply tw--translate-y-1/2;

    &--hide {
      @apply tw-hidden;
    }
  }

  &__prev {
    @apply tw-left-0;
  }

  &__next {
    @apply tw-right-0;
  }
}
</style>
