<template>
  <div v-editable="slides" class="carousel">
    <ContentWrapper v-bind="contentWrapperProps">
      <VueSlickCarousel
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
          :name="slide.uiComponent || slide.component"
        />
        <template v-for="slide in slides">
          {{ slide }}
        </template>
        <template #prevArrow>
          <Button
            class="slider__prev"
            :class="{ 'slider__prev--hide': isFirstSlide }"
            variant="secondary"
            icon="arrow_back"
            cutaway="right"
          />
        </template>
        <template #nextArrow>
          <Button
            class="slider__next"
            :class="{ 'slider__next--hide': isLastSlide }"
            variant="secondary"
            icon="arrow_forward"
            cutaway="left"
          />
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
    let isFirstSlide = ref(false)
    let isLastSlide = ref(false)

    /**
     * Set computed property infinite
     * carousel in wide mode (breakout) should never be infinite
     * otherwise set infinite based on setting
     */
    const infiniteSetting = computed(() => {
      //settings should override values
      if (props.settings && props.settings?.infinite)
        return props.settings?.infinite
      if (isBreakout.value) return false

      return props.infinite
    })

    /**
     * watchEffect will be triggered once the carousel is mounted
     */
    watchEffect(() => {
      if (!carousel.value || infiniteSetting.value) return

      /*
       * isFirstSlide and isLastSlide won't be set dynamically when the
       * carousel is infinite, because then we always want to show the btns
       */
      const innerSlider = carousel.value.$refs.innerSlider
      const slideCount = innerSlider?.slideCount
      const slidesToShowCarousel = innerSlider?.slidesToShow
      const totalSlidesCount = Math.ceil(slideCount - slidesToShowCarousel)

      isFirstSlide.value = currentSlide.value === 0
      isLastSlide.value = currentSlide.value >= totalSlidesCount
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

    const defaultSettings = {
      adaptiveHeight: true,
      arrows: true,
      edgeFriction: 0.35,
      pauseOnFocus: true,
      speed: 300,
      slidesToShow: slidesToShow.value,
      slidesToScroll: 1,
      initialSlide: isBreakout.value ? 0 : -1,
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
}

.slider {
  &__prev,
  &__next {
    @apply tw-inline-flex;
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
  }

  &__prev {
    @apply tw-left-0;
  }

  &__next {
    @apply tw-right-0;
  }
}
</style>
