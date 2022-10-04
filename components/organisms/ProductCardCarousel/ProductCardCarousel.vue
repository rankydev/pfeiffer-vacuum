<template>
  <div class="product-card-carousel">
    <ContentCarousel
      v-if="(enrichedSlides || []).length"
      :headline="headline"
      :button="button"
      :autoplay="autoplay"
      :autoplay-speed="autoplaySpeed"
      :infinite="infinite"
      :slides="enrichedSlides"
    />
  </div>
</template>

<script>
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'
import { ref, defineComponent, useAsync } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'

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

    const slides = ref(props.slides.slice(0, 16))

    // Extracted codes from slides
    const productCodes = slides.value.map((e) => e.product?.code)

    // Enriched slides with hybris data
    const enrichedSlides = useAsync(async () => {
      // Fetched hybris products
      let fetchedProducts = await productStore.getProducts(productCodes)

      return slides.value.map((e) => ({
        ...e,
        product: {
          ...fetchedProducts?.find((i) => i.code === e.product.code),
        },
      }))
    }, String(productCodes) || 'empty')

    return { enrichedSlides }
  },
})
</script>
