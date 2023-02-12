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
          <div class="product-page">
            <div class="product-page__headline-wrapper">
              <h1 class="product-page__headline">
                {{ (productStore.product || {}).name }}
              </h1>
              <Button
                label="Hilfe zum Produkt"
                variant="secondary"
                shape="outlined"
                icon="help"
              />
            </div>

            <div class="product-page__upper-section">
              <div class="product-page__image-gallery">
                <ImageGallery
                  v-if="sortedImages.length"
                  :images="sortedImages"
                />
                <ResponsiveImage
                  v-else
                  aspect-ratio="3:2"
                  fallback-image-icon-size="xxlarge"
                />
              </div>
              <div
                id="variantselection"
                class="product-page__variant-selection"
              >
                <VariantSelection />
              </div>
            </div>

            <div
              v-if="productReferencesRecommendedAccessories.length"
              class="tw-w-full"
            >
              <RecommendedAccessories
                :headline="
                  $t('product.recommended.title') + productStore.product.name
                "
              />
            </div>
          </div>
        </ContentWrapper>
        <DetailTabs class="product-page__detail-tabs" />
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  useRoute,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  watch,
  onServerPrefetch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'

import { storeToRefs } from 'pinia'
import { useProductStore, useVariationmatrixStore } from '~/stores/product'
import { useUserStore } from '~/stores/user'
import { usePageStore, PRODUCT_PAGE } from '~/stores/page'

import { useErrorHandler } from '~/composables/useErrorHandler'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'

import Page from '~/components/templates/Page/Page'
import DetailTabs from '~/components/molecules/DetailTabs/DetailTabs'
import ImageGallery from '~/components/organisms/ImageGallery/ImageGallery'
import RecommendedAccessories from '~/components/organisms/RecommendedAccessories/RecommendedAccessories'
import VariantSelection from '~/components/molecules/VariantSelection/VariantSelection'

export default defineComponent({
  name: 'ProductShopPage',
  components: {
    Page,
    DetailTabs,
    ImageGallery,
    RecommendedAccessories,
    VariantSelection,
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
    const variationmatrixStore = useVariationmatrixStore()
    const { productReferencesRecommendedAccessories } =
      storeToRefs(productStore)

    const loadProduct = async () => {
      await redirectOnError(productStore.loadByPath)
    }

    onServerPrefetch(async () => await loadProduct())
    onBeforeMount(async () => await loadProduct())
    watch(
      computed(() => route.value.path),
      async () => await loadProduct()
    )
    onBeforeUnmount(variationmatrixStore.clearMatrix)

    /**
     * react to changing user login status
     */
    const userStore = useUserStore()
    const { isLoggedIn, isApprovedUser } = storeToRefs(userStore)
    watch(isLoggedIn, productStore.loadAllPrices)
    watch(isApprovedUser, productStore.loadAllPrices)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const path = context.app.localePath('shop-products-product')
    const { slug, fallbackSlug, language } = buildSlugs(path)

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
            url: image.url,
            altText: image.altText,
          })
        }
      }

      return result
    })

    return {
      slug,
      fallbackSlug,
      language,
      productStore,
      variationmatrixStore,
      sortedImages,
      productReferencesRecommendedAccessories,
    }
  },
})
</script>
<style lang="scss">
.product-page {
  @apply tw-flex;
  @apply tw-flex-wrap tw-items-start;
  @apply tw-gap-4;

  @screen md {
    @apply tw-gap-6;
  }

  @screen lg {
    @apply tw-gap-8;
  }

  &__headline-wrapper {
    @apply tw-flex;
    @apply tw-w-full;
    @apply tw-justify-between tw-items-center;
  }

  &__headline {
    @apply tw-leading-10;
    @apply tw-min-w-full;
    @apply tw-flex-1;

    @screen md {
      @apply tw-min-w-0;
    }
  }

  &__upper-section {
    @apply tw-flex tw-justify-between;
    @apply tw-flex-col;
    @apply tw-w-full;
    @apply tw-gap-6;

    @screen md {
      @apply tw-flex-row;
    }

    @screen lg {
      @apply tw-gap-16;
    }
  }

  &__variant-selection {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-1/2;
      max-width: 550px;
    }
  }

  &__image-gallery {
    @apply tw-flex;
    @apply tw-flex-1;

    @screen md {
      @apply tw-min-w-0;
    }
  }

  &__detail-tabs {
    @apply tw-mt-8;
  }
}
</style>
