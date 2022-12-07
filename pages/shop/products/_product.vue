<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <Page
        v-if="data && productStore.product"
        v-bind="data"
        :meta-data="productStore.metaData"
      >
        <ContentWrapper>
          <!-- placeholder start -->
          <div
            class="tw-flex tw-flex-wrap tw-items-start sm:tw-gap-4 md:tw-gap-6 lg:tw-gap-8"
          >
            <h1 class="tw-leading-10 tw-min-w-full md:tw-min-w-0 tw-flex-1">
              {{ (productStore.product || {}).name }}
            </h1>

            <div
              class="tw-hidden tw-bg-pv-grey-88 tw-rounded-md"
              :class="'md:tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center'"
              style="height: 48px; width: 200px"
            >
              Button
            </div>

            <div class="tw--my-4" style="width: 100%; height: 0px">&nbsp;</div>

            <div class="product-page__image-gallery">
              <ImageGallery :images="sortedImages" />
            </div>
            <div
              id="variantselection"
              class="tw-bg-pv-grey-88 tw-w-full md:tw-w-1/2 lg:tw-w-5/12 tw-rounded-lg"
              :class="'tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-5xl tw-text-center'"
              style="height: 600px"
            >
              Variant Selection
            </div>
            <div v-if="recommendedAccessories.length" class="tw-w-full">
              <RecommendedAccessories
                :headline="
                  $t('product.recommended.title') + productStore.product.name
                "
              />
            </div>
            <DetailTabs
              :product="productStore.product"
              :product-code="productStore.code"
            />
          </div>
        </ContentWrapper>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  useRoute,
  defineComponent,
  onBeforeMount,
  watch,
  onServerPrefetch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, PRODUCT_PAGE } from '~/stores/page'
import { useErrorHandler } from '~/composables/useErrorHandler'
import Page from '~/components/templates/Page/Page'
import DetailTabs from '~/components/molecules/DetailTabs/DetailTabs.vue'
import ImageGallery from '~/components/organisms/ImageGallery/ImageGallery'
import { useImageHelper } from '~/composables/useImageHelper/useImageHelper'
import RecommendedAccessories from '~/components/organisms/RecommendedAccessories/RecommendedAccessories'

export default defineComponent({
  name: 'ProductShopPage',
  components: {
    Page,
    DetailTabs,
    ImageGallery,
    RecommendedAccessories,
  },
  setup() {
    const route = useRoute()
    const context = useContext()
    const { redirectOnError } = useErrorHandler()

    /**
     * Set the type of the pages, enabling components
     * like the breadcrumb to retrieve the correct data
     */
    const pageStore = usePageStore()
    pageStore.setPageType(PRODUCT_PAGE)

    /**
     * Load the category data on each route change
     * Redirects to the error page if category was not found
     */
    const productStore = useProductStore()
    const { recommendedAccessories } = useProductStore()
    const loadProduct = () => {
      productStore.getProductAccessories()
      redirectOnError(productStore.loadByPath)
    }

    onServerPrefetch(loadProduct)
    onBeforeMount(loadProduct)
    watch(route, loadProduct)

    const carouselEntries = computed(() => {
      // TODO: return recommended accessories
      return []
    })

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const path = context.app.localePath('shop-products-product')
    const { slug, fallbackSlug, language } = buildSlugs(path)

    const { getAssetImage, getShopMedia } = useImageHelper()

    const sortedImages = computed(() => {
      let images = []
      const imgArr = productStore.product?.images

      if (imgArr) {
        const primArr = imgArr.filter((i) => i.imageType === 'PRIMARY')
        const gallArr = imgArr.filter((i) => i.imageType === 'GALLERY')

        gallArr.sort(function (a, b) {
          if (a.galleryIndex < b.galleryIndex) {
            return -1
          }
          if (a.galleryIndex > b.galleryIndex) {
            return 1
          }
          return 0
        })

        images = primArr.concat(gallArr)
      }

      const result = []

      if (images && images.length > 0) {
        for (const image of images) {
          result.push({
            type: image.imageType,
            url: getShopMedia(image.url),
            altText: image.altText,
          })
        }
      } else {
        result.push({
          url: getAssetImage(context.app.i18n.t('product.placeholderImage')),
        })
      }

      return result
    })

    return {
      slug,
      fallbackSlug,
      language,
      productStore,
      carouselEntries,
      sortedImages,
      recommendedAccessories,
    }
  },
})
</script>
<style lang="scss">
.product-page {
  &__image-gallery {
    @apply tw-min-w-full;
    @apply tw-flex-1;
    @apply tw-flex;

    @screen md {
      @apply tw-min-w-0;
    }
  }
}
</style>
