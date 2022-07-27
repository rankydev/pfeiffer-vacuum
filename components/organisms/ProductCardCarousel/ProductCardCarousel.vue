<template>
  <div class="product-card-carousel">
    <ContentCarousel
      v-if="enrichedSlides.length"
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
import {
  ref,
  defineComponent,
  useContext,
  useAsync,
} from '@nuxtjs/composition-api'

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
    const { $hybrisApi } = useContext()

    // Extracted codes from slides
    const productCodes = props.slides.map((e) => e.product?.code)

    // Enriched slides with hybris data
    let enrichedSlides = ref([])

    useAsync(async () => {
      // Fetched hybris products
      let fetchedProducts = await $hybrisApi.productApi.getProducts(
        productCodes
      )

      props.slides.forEach((e) => {
        enrichedSlides.value.push({
          ...e,
          ...fetchedProducts?.find((i) => i.code === e.code),
        })
      })
    }, productCodes)

    return { enrichedSlides }
  },
})
</script>