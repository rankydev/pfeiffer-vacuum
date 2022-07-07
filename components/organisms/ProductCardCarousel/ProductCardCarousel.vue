<template>
  <div>
    <ContentCarousel v-bind="$args"></ContentCarousel>
    {{ products }}
  </div>
</template>

<script>
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { useProductStore } from '~/stores/products/products'

export default {
  name: 'ProductCardCarousel',
  components: { ContentCarousel },
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
     * autoplay Speed in seconds, retrieves string from Storyblok
     */
    autoplaySpeed: {
      type: String,
      default: '5',
    },
  },
  setup() {
    const productStore = useProductStore()

    productStore.fetchProducts(['128ee16d-cb90-45be-9986-c8006a5235e6_sample'])

    return { products: productStore.products }
  },
}
</script>

<style scoped></style>
