<template>
  <VueSlickCarousel
    ref="carousel"
    v-bind="settings"
    :center-mode="centerMode"
    :infinite="infinite"
  >
    <slot />
    <template #prevArrow="arrowOption">
      <div class="custom-arrow button button--secondary button--icon-only">
        {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
      </div>
    </template>
    <template #nextArrow="arrowOption">
      <div class="custom-arrow button button--secondary button--icon-only">
        {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
      </div>
    </template>
  </VueSlickCarousel>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
import VueSlickCarousel from 'vue-slick-carousel'

export default defineComponent({
  name: 'Carousel',
  components: {
    VueSlickCarousel,
  },
  props: {
    settings: {
      type: Object,
      default: () => {
        return {
          autoplay: false,
          autoplaySpeed: 5000,
          dots: false,
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
})
</script>
