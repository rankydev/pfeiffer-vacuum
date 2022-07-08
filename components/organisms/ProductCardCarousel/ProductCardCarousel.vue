<template>
  <div>
    <ContentCarousel
      :headline="headline"
      :button="button"
      :autoplay="autoplay"
      :autoplay-speed="autoplaySpeed"
      :infinite="infinite"
      :slides="productSlides"
    />
  </div>
</template>

<script>
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { useProductStore } from '~/stores/products/products'
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
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
    const productStore = useProductStore()
    const productSlides = computed(() =>
      props.slides.filter((slide) => slide.product?.code)
    )
    const products = computed(() => productStore.products)

    let productCodes = []

    /**
     * extract product codes
     */
    productSlides.value.forEach((slide) => {
      const code = slide.product?.code
      if (productCodes.includes(code)) return

      productCodes.push(code)
    })
    productStore.fetchProducts(productCodes)

    //if products are getting updated after fetch, the following logic will be retriggered
    if (products.value && products.value.length) {
      /**
       * get productData for each slide
       */
      productSlides.value.forEach((slide, index) => {
        const code = slide.product?.code

        const productData = computed(() => productStore.getProductById(code))

        slide.product = productData.value
      })
    }

    return { products: productStore.products, productSlides }
  },
})
</script>

<style scoped></style>
