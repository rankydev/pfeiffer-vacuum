<template>
  <ContentWrapper
    v-bind="contentWrapperProps"
    ref="wrapper"
    v-editable="(infinite, isWide, autoplay, autoplaySpeedMilliseconds)"
    class="carousel"
  >
    <VueSlickCarousel
      ref="carousel"
      v-bind="settings"
      :infinite="infinite"
      :autoplay="false"
      :wait-for-animate="false"
      :autoplay-speed="autoplaySpeedMilliseconds"
      :class="[
        'carousel__slider',
        `carousel__slider--${variant}`,
        { 'carousel__slider--wide': isBreakout },
        { 'carousel__slider--gaps': settings.slidesToShow > 1 },
      ]"
    >
      <!-- @slot carousel slides -->
      <slot name="slides">
        <!-- empty element is needed, so the slider doesn't throw an error  -->
        <div />
      </slot>

      <template #prevArrow="{ currentSlide }">
        <Button
          class="carousel__arrow-prev"
          :class="{
            'carousel__arrow-prev--hide':
              !infinite && isFirstSlide(currentSlide),
          }"
          variant="secondary"
          icon="arrow_back_ios"
          cutaway="right"
        />
      </template>
      <template #nextArrow="{ currentSlide, slideCount }">
        <Button
          class="carousel__arrow-next"
          :class="{
            'carousel__arrow-next--hide':
              !infinite && isLastSlide(currentSlide, slideCount),
          }"
          variant="secondary"
          icon="arrow_forward_ios"
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
import VueSlickCarousel from 'vue-slick-carousel'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import tailwindconfig from '~/tailwind.config'
import { useResizeObserver } from '@vueuse/core'

export default defineComponent({
  name: 'GenericCarousel',
  components: {
    Button,
    VueSlickCarousel,
    ContentWrapper,
  },
  props: {
    /**
     * enables/disables wide mode of carousel (breakout of ContentWrapper)
     */
    isWide: {
      type: Boolean,
      default: true,
    },
    /**
     * set the variant for different slider types
     * @values default, homeStage
     */
    variant: {
      type: String,
      default: 'default',
      validator: (val) =>
        [
          'default',
          'homeStage',
          'documentCardCarousel',
          'customContentCardCarousel',
          'accessoriesCardCarousel',
        ].includes(val),
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
    const isBreakout = computed(() => {
      if (props.variant === 'accessoriesCardCarousel') {
        return false
      }
      return !app.$breakpoints.isDesktop.value || props.isWide
    })

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
     * set ContentWrapper props based on isBreakout value
     * ContentWrapper should have noPadding when the carousel will be rendered normally
     */
    const contentWrapperProps = computed(() => ({
      breakout: isBreakout.value,
      noPadding: !isBreakout.value,
    }))

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
    const autoplaySpeedMilliseconds = computed(() =>
      Math.ceil(parseInt(props.autoplaySpeed || 5) * 1000)
    )

    const defaultSettings = computed(() => ({
      slidesToShow: isBreakout.value ? 6 : 4,
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
    }))

    const homeStageSettings = computed(() => ({
      fade: true,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.md),
          settings: {
            dots: false,
            arrows: false,
          },
        },
      ],
    }))

    const customContentCardCarouselSettings = computed(() => ({
      slidesToShow: 4,
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
    }))

    const documentCardCarouselSettings = computed(() => ({
      slidesToShow: 6,
      responsive: [
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.lg),
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: splitBreakpointString(tailwindConfigScreens.md),
          settings: {
            slidesToShow: 2,
            dots: true,
            arrows: false,
          },
        },
      ],
    }))

    /**
     * Settings for slick carousel
     * see: https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#props
     */
    const settings = computed(() => ({
      arrows: true,
      edgeFriction: 0.35,
      pauseOnFocus: true,
      speed: 300,
      slidesToScroll: 1,
      initialSlide: 0,
      swipeToSlide: true,
      ...(props.variant === 'documentCardCarousel' &&
        documentCardCarouselSettings.value),
      ...(props.variant === 'customContentCardCarousel' &&
        customContentCardCarouselSettings.value),
      ...(props.variant === 'homeStage' && homeStageSettings.value),
      ...(props.variant === 'default' && defaultSettings.value),
      ...(props.variant === 'accessoriesCardCarousel' && defaultSettings.value),
    }))

    return {
      wrapper,
      carousel,
      settings,
      isBreakout,
      contentWrapperProps,
      isFirstSlide,
      isLastSlide,
      autoplaySpeedMilliseconds,
    }
  },
})
</script>

<style lang="scss">
.carousel {
  &__arrow {
    &-prev,
    &-next {
      @apply tw-absolute;
      @apply tw-top-1/2;
      @apply tw-z-20;
      @apply tw--translate-y-1/2;

      &--hide {
        @apply tw-hidden;
      }
    }

    &-prev {
      @apply tw-left-0;
    }

    &-next {
      @apply tw-right-0;
    }
  }

  &__slider {
    @apply tw-relative;
    user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;

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

    &--homeStage {
      @apply tw-p-0;
    }

    &--gaps {
      .slick-slide {
        // this is important to make all items same size (flex behaviour)
        width: 0 !important;
        @apply tw-flex-1;

        // this is here for the gaps between the cards
        @apply tw-mx-2;
      }

      .slick-list {
        // this handles the additional whitespace left and right from first and last item through margin
        margin: 0 -8px;
      }
    }

    &--accessoriesCardCarousel {
      // place the icons to the edges of the container (inside tabs on pdp or recommended slider accordion)
      .carousel {
        &__arrow {
          &-prev {
            left: -20px;
          }

          &-next {
            right: -20px;
          }
        }
      }
    }
  }
}
</style>
