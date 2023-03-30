<template>
  <div
    class="product-card-carousel"
    :class="{ 'product-card-carousel-error': isError }"
  >
    <ContentCarousel
      v-if="!isError"
      :headline="headline"
      :button="button"
      :autoplay="autoplay"
      :autoplay-speed="autoplaySpeed"
      :infinite="infinite"
      :slides="enrichedSlides"
    />
    <div v-else class="product-card-carousel-error__error-section">
      <div class="product-card-carousel-error__error-section--header">
        <h2>{{ headline }}</h2>
        <Button v-if="button.length" v-bind="button" />
      </div>
      <ErrorHandling
        :headline="$t('product.errorHandling.multiProductHeadline')"
        class="product-card-carousel-error__error-section--handling"
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

    const slides = ref(props.slides?.slice(0, 16))

    // Extracted codes from slides
    const productCodes = slides.value?.map((e) => e.product?.code)

    let enrichedSlides = ref([])

    const isError = ref(false)

    const fetchProducts = async () => {
      const tempProducts = await productStore.getProducts(productCodes)

      if (tempProducts?.length < 1) {
        isError.value = true
      } else {
        enrichedSlides.value = slides.value?.map((e) => ({
          ...e,
          product: {
            ...tempProducts?.find((i) => i?.code === e?.product?.code),
          },
        }))
      }
    }

    onServerPrefetch(fetchProducts)
    onBeforeMount(fetchProducts)
    watch(route, () => {
      fetchProducts()
    })

    return { enrichedSlides, isError }
  },
})
</script>

<style lang="scss">
.product-card-carousel {
  &-error {
    @apply tw-relative;
    @apply tw-w-screen;
    @apply tw-left-1/2;
    @apply tw-ml-[-50vw];
    @apply tw-bg-pv-grey-96;
    @apply tw-px-4;
    @apply tw-py-6;

    @screen md {
      @apply tw-py-10;
      @apply tw-px-6;
    }

    @screen lg {
      @apply tw-py-[52px];
      padding-left: max((100vw - 1440px) / 2 + 2rem, 2rem);
      @apply tw-pr-8;
    }

    &__error-section {
      @apply tw-flex;
      @apply tw-flex-col;

      &--header {
        @apply tw-flex;
        @apply tw-flex-col;
        @apply tw-mb-4;

        @screen md {
          @apply tw-flex-row;
          @apply tw-items-center;
        }

        .button {
          @apply tw-mt-4;

          @screen md {
            @apply tw-mt-0;
            @apply tw-ml-auto;
          }
        }
      }

      &--handling {
        @apply tw-bg-pv-white;
        @apply tw-rounded;
        @apply tw-w-full;
        @apply tw-p-4;
        @apply tw-m-auto;
        @apply tw-min-h-[400px];
      }
    }
  }
}
</style>
