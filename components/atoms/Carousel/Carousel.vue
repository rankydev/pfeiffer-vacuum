<template>
  <VueSlickCarousel
    v-if="slides.length"
    ref="carousel"
    v-bind="{ ...defaultSettings, ...settings }"
    :center-mode="centerMode"
    :infinite="infinite"
    :autoplay="autoplay"
    :dots="dots"
    class="carousel"
  >
    <slot name="carousel" />
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
        variant="secondary"
        icon="arrow_forward"
        cutaway="cutaway-left"
      >
      </Button>
    </template>
  </VueSlickCarousel>
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

export default defineComponent({
  name: 'Carousel',
  components: {
    Button,
    VueSlickCarousel,
  },
  props: {
    settings: {
      type: Object,
      default: () => {},
    },
    centerMode: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    dots: {
      type: Boolean,
      default: false,
    },
    slides: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const carousel = ref(null)
    const currentSlide = computed(
      () => carousel.value.$refs.innerSlider.currentSlide
    )
    let isFirstSlide = ref(true)

    watchEffect(() => {
      if (carousel.value) {
        isFirstSlide.value = carousel.value.$refs.innerSlider.currentSlide === 0
      }
    })

    const defaultSettings = {
      autoplaySpeed: 5000,
      adaptiveHeight: true,
      dotsClass: 'slick-dots custom-dot-class',
      edgeFriction: 0.35,
      pauseOnFocus: true,
      speed: 800,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
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
      defaultSettings,
      isFirstSlide,
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
  }

  &__prev {
    @apply tw-left-0;

    &--hide {
      display: none;
    }

    &--show {
      display: block;
    }
  }

  &__next {
    @apply tw-right-0;
  }

  .slick-slide {
    @apply tw-px-2;

    .teaser-card {
      @apply tw-h-full;
    }
  }
}
</style>
