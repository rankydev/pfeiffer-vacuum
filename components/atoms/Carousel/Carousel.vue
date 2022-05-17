<template>
  <div
    v-editable="slides"
    class="carousel"
    :class="{ 'carousel--home-stage': isHomeStage }"
  >
    <div v-if="!isHomeStage" class="carousel__content">
      <h2>{{ headline }}</h2>
      <NuxtDynamic
        v-for="btn in button"
        :key="btn._uid"
        v-bind="btn"
        :component="btn.uiComponent || btn.component"
      />
    </div>
    <ContentWrapper v-bind="contentWrapperProps">
      <VueSlickCarousel
        v-if="slides.length"
        ref="carousel"
        v-bind="{ ...defaultSettings, ...settings }"
        :infinite="infiniteSetting"
        :autoplay="autoplay"
        :autoplay-speed="parseInt(autoplaySpeed)"
        class="carousel__slider"
        :class="{ 'carousel__slider--wide': isWide }"
      >
        <NuxtDynamic
          v-for="slide in slides"
          :key="slide._uid"
          v-editable="slide"
          v-bind="slide"
          :component="slide.uiComponent || slide.component"
        />
        <template #prevArrow>
          <Button
            class="slider__prev"
            :class="{
              'slider__prev--show': !isFirstSlide,
              'slider__prev--hide': isFirstSlide,
            }"
            variant="secondary"
            icon="arrow_back"
            cutaway="cutaway-right"
          >
          </Button>
        </template>
        <template #nextArrow>
          <Button
            class="slider__next"
            :class="{
              'slider__next--show': !isLastSlide,
              'slider__next--hide': isLastSlide,
            }"
            variant="secondary"
            icon="arrow_forward"
            cutaway="cutaway-left"
          >
          </Button>
        </template>
      </VueSlickCarousel>
    </ContentWrapper>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
} from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import tailwindconfig from '~/tailwind.config'

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
    /**
     * when carousel is home stage, wide mode is enabled and headline, as
     * well as button won't be rendered above carousel
     */
    isHomeStage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tailwindConfigScreens = tailwindconfig.theme.screens

    /**
     * Check if carousel is breakout (wide mode)
     */
    const isBreakout = computed(() => props.isWide)

    /**
     * Get Carousel object by reference
     */
    const carousel = ref(null)

    /**
     * Get currentSlide of carousel
     */
    const currentSlide = computed(
      () => carousel.value.$refs.innerSlider?.currentSlide
    )

    /**
     * set isFirstSlide && isLastSlide to initial values
     * props enable/disable the buttons on the carousel
     */
    let isFirstSlide = ref(true)
    let isLastSlide = ref(false)

    /**
     * Set computed property infinite
     * carousel in wide mode (breakout) should never be infinite
     * otherwise set infinite based on setting
     */
    const infiniteSetting = computed(() => {
      if (props.infinite && props.isHomeStage) {
        return true
      }
      if (props.infinite && isBreakout.value) {
        return false
      }
      return !!(props.infinite && !isBreakout.value)
    })

    /**
     * watchEffect will be triggered once the carousel is mounted
     */
    watchEffect(() => {
      if (carousel.value) {
        /**
         * isFirstSlide and isLastSlide won't be set dynamically when the
         * carousel is infinite, because then we always want to show the btns
         */
        if (!infiniteSetting.value) {
          const innerSlider = carousel.value.$refs.innerSlider
          const slideCount = innerSlider?.slideCount
          const slidesToShowCarousel = innerSlider?.slidesToShow
          const totalSlidesCount = Math.ceil(slideCount - slidesToShowCarousel)

          isFirstSlide.value = innerSlider?.currentSlide === 0
          isLastSlide.value = totalSlidesCount === currentSlide.value
        } else {
          isFirstSlide.value = false
          isLastSlide.value = false
        }
      }
    })

    /**
     * set ContentWrapper props based on isBreakout and isHomeStage values
     * ContentWrapper should have noPadding when the carousel will be rendered normally
     * ContentWrapper should have breakout, when the carousel isHomeStage || isBreakout
     */
    const contentWrapperProps = computed(() => ({
      breakout: props.isHomeStage ? true : isBreakout.value,
      noPadding: !isBreakout.value,
    }))

    /**
     * slidesToShow should be set to 6 for wide mode carousels on desktop
     * otherwise the carousel should only show 4 slides
     */
    const slidesToShow = computed(() => (isBreakout.value ? 6 : 4))

    const defaultSettings = {
      adaptiveHeight: true,
      arrows: true,
      edgeFriction: 0.35,
      initialSlide: 0,
      pauseOnFocus: true,
      speed: 300,
      slidesToShow: slidesToShow.value,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: tailwindConfigScreens.lg,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: tailwindConfigScreens.md,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }

    return {
      carousel,
      currentSlide,
      contentWrapperProps,
      defaultSettings,
      isFirstSlide,
      isLastSlide,
      infiniteSetting,
    }
  },
})
</script>
<style lang="scss">
.carousel {
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

  &__slider {
    &--wide {
      @apply tw-px-4;
      @apply tw-overflow-hidden;

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

    .slick-track {
      @apply tw-flex;
      @apply tw-gap-4;

      &::before,
      &::after {
        @apply tw-content-none;
      }
    }

    .teaser-card {
      @apply tw-h-full;
    }
  }

  &--home-stage {
    .slick-slider {
      padding: 0;

      .slick-track {
        @apply tw-gap-0;

        .slick-slide {
          min-width: 100vw;
        }
      }
    }
  }
}

.slider {
  &__prev,
  &__next {
    @apply tw-absolute;
    @apply tw-top-1/2;
    @apply tw-z-10;
    @apply tw--translate-y-2/4;

    &::before {
      @apply tw-content-none;
    }

    &--hide {
      @apply tw-hidden;
    }

    &--show {
      @apply tw-inline-flex;
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
