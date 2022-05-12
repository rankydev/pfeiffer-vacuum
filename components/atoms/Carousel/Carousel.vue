<template>
  <ContentWrapper v-bind="contentWrapperProps">
    <VueSlickCarousel
      v-if="slides.length"
      ref="carousel"
      v-bind="{ ...defaultSettings, ...settings }"
      :infinite="infiniteSetting"
      autoplay
      class="carousel"
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
          class="carousel__prev"
          :class="{
            'carousel__prev--show': !isFirstSlide,
            'carousel__prev--hide': isFirstSlide,
          }"
          variant="secondary"
          icon="arrow_back"
          cutaway="cutaway-right"
        >
        </Button>
      </template>
      <template #nextArrow>
        <Button
          class="carousel__next"
          :class="{
            'carousel__next--show': !isLastSlide,
            'carousel__next--hide': isLastSlide,
          }"
          variant="secondary"
          icon="arrow_forward"
          cutaway="cutaway-left"
        >
        </Button>
      </template>
    </VueSlickCarousel>
  </ContentWrapper>
</template>
<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watchEffect,
  reactive,
  watch,
} from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '@/components/molecules/ContentWrapper/ContentWrapper'

export default defineComponent({
  name: 'Carousel',
  components: {
    Button,
    VueSlickCarousel,
    ContentWrapper,
  },
  props: {
    headline: {
      type: String,
      default: '',
    },
    button: {
      type: Array,
      default: () => [],
    },
    slides: {
      type: Array,
      default: () => [],
    },
    isWide: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      default: () => ({}),
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
  setup(props) {
    const carouselIsBreakout = computed(() => props.isWide)
    const carousel = ref(null)
    const currentSlide = computed(
      () => carousel.value.$refs.innerSlider.currentSlide
    )
    let isFirstSlide = ref(true)
    let isLastSlide = ref(false)

    const infiniteSetting = computed(() => {
      if (props.infinite && carouselIsBreakout.value) {
        return false
      }
      return !!(props.infinite && !carouselIsBreakout.value)
    })

    watchEffect(() => {
      if (carousel.value) {
        if (!infiniteSetting.value) {
          const innerSlider = carousel.value.$refs.innerSlider
          const slideCount = innerSlider.slideCount
          const slidesToShowCarousel = innerSlider.slidesToShow
          const totalSlidesCount = Math.ceil(slideCount / slidesToShowCarousel)

          isFirstSlide.value = innerSlider.currentSlide === 0
          isLastSlide.value = totalSlidesCount - 1 === currentSlide.value
        } else {
          isFirstSlide.value = false
          isLastSlide.value = false
        }
      }
    })

    const contentWrapperProps = computed(() => ({
      breakout: carouselIsBreakout.value,
      noPadding: !carouselIsBreakout.value,
    }))

    const slidesToShow = computed(() => (carouselIsBreakout.value ? 6 : 4))

    const defaultSettings = {
      adaptiveHeight: true,
      arrows: true,
      autoplaySpeed: 5000,
      edgeFriction: 0.35,
      initialSlide: 0,
      pauseOnFocus: true,
      speed: 300,
      slidesToShow: slidesToShow.value,
      slidesToScroll: 1,
      responsive: [
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
  &__prev,
  &__next {
    @apply tw-absolute;
    @apply tw-top-1/2;
    @apply tw-z-10;
    transform: translateY(-50%);

    &::before {
      @apply tw-content-none;
    }

    &--hide {
      display: none;
    }

    &--show {
      display: block;
    }
  }

  &__prev {
    @apply tw-left-0;
  }

  &__next {
    @apply tw-right-0;
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
</style>
