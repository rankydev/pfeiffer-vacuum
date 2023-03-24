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
    <div v-else>
      <div class="product-card-carousel__error-wrapper">
        <h2>{{ headline }}</h2>
        <Button v-if="button.length" v-bind="button" />
      </div>
      <ErrorHandling
        :headline="$t('product.errorHandling.multiProductHeadline')"
        class="product-card-carousel__error-handling"
      />
    </div>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  onServerPrefetch,
  onBeforeMount,
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import Button from '~/components/atoms/Button/Button'
import ErrorHandling from '~/components/molecules/ErrorHandling/ErrorHandling'
import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel'

export default defineComponent({
  name: 'ProductCardCarousel',
  components: { Button, ErrorHandling, ContentCarousel },
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
    const route = useRoute()
    const productStore = useProductStore()

    const slides = ref(props.slides.slice(0, 16))

    // Extracted codes from slides
    const productCodes = slides.value.map((e) => e.product?.code)

    let enrichedSlides = ref([])

    const fetchProducts = async () => {
      const tempProducts = await productStore.getProducts(productCodes)

      enrichedSlides.value = slides.value.map((e) => ({
        ...e,
        product: {
          ...tempProducts?.find((i) => i.code === e.product.code),
        },
      }))
    }

    onServerPrefetch(fetchProducts)
    onBeforeMount(fetchProducts)
    watch(route, () => {
      fetchProducts()
    })

    return { enrichedSlides }
  },
})
</script>

<style lang="scss">
.product-card-carousel {
  &__error-wrapper {
    @apply tw-flex tw-justify-between;
    @apply tw-mt-8;
    @apply tw-mb-6;
  }

  &__error-handling {
    @apply tw-mb-8;

    &.error-handling {
      @apply tw-py-[204px];
    }
  }
}
</style>
