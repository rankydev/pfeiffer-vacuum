<template>
  <VueSlickCarousel
    ref="carousel"
    v-bind="settings"
    :center-mode="centerMode"
    :infinite="infinite"
    class="carousel"
  >
    <slot />
    <template #prevArrow>
      <Button
        class="carousel__prev"
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
import { defineComponent } from '@nuxtjs/composition-api'
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
      default: () => {
        return {
          autoplay: false,
          autoplaySpeed: 5000,
          dots: true,
          dotsClass: 'slick-dots custom-dot-class',
          edgeFriction: 0.35,
          pauseOnFocus: true,
          speed: 800,
          arrows: true,
        }
      },
    },
    centerMode: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {},
})
</script>
<style lang="scss">
.carousel {
  @apply tw-h-80;

  &__prev,
  &__next {
    @apply tw-absolute;
    @apply tw-top-1/2;
    @apply tw-translate-y-1/2;

    &::before {
      content: '';
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
