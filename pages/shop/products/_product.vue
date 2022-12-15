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
              <ImageGallery v-if="sortedImages.length" :images="sortedImages" />
              <ResponsiveImage
                v-else
                aspect-ratio="3:2"
                fallback-image-icon-size="xxlarge"
              />
            </div>
            <div
              id="variantselection"
              class="tw-p-2 tw-bg-pv-grey-88 tw-w-full md:tw-w-1/2 lg:tw-w-5/12 tw-rounded-lg"
            >
              <LoadingSpinner :show="variationmatrixStore.loadingMatrix">
                <div>
                  <h4>Legende:</h4>
                  <div>
                    <button class="tw-p-2 tw-m-2 tw-border-2">Available</button>
                    <button
                      class="tw-p-2 tw-m-2 tw-border-2 tw-bg-pv-red tw-text-pv-white"
                    >
                      User Selection
                    </button>
                    <button class="tw-p-2 tw-m-2 tw-border-2 tw-border-pv-red">
                      Automatically
                    </button>
                    <button
                      class="tw-p-2 tw-m-2 tw-border-2 tw-bg-pv-grey-32 tw-text-pv-white"
                    >
                      Disabled
                    </button>
                  </div>
                </div>
                <div class="tw-py-6">
                  <div
                    v-for="(attr, index) in (
                      variationmatrixStore.variationMatrix || {}
                    ).variationAttributes"
                    :key="index"
                    class="tw-border-b-2"
                  >
                    <span>{{ attr.name }}</span>
                    <ul>
                      <li
                        v-for="val in attr.variationValues"
                        :key="val.displayName"
                      >
                        <button
                          class="tw-p-2 tw-m-2 tw-border-2 tw-text-sm disabled:tw-bg-pv-grey-32 disabled:tw-text-pv-white disabled:tw-border-pv-white hover:tw-border-pv-red-lighter hover:tw-bg-pv-red-lighter hover:tw-text-pv-white"
                          :class="{
                            'tw-border-2 tw-border-pv-red':
                              val.selected &&
                              !(
                                attr.code in
                                variationmatrixStore.selectedAttributes
                              ),
                            'tw-bg-pv-red tw-text-pv-white':
                              val.selected &&
                              attr.code in
                                variationmatrixStore.selectedAttributes,
                          }"
                          :disabled="!val.selectable"
                          @click="
                            variationmatrixStore.toggleAttribute(
                              attr.code,
                              val.value
                            )
                          "
                        >
                          {{ val.displayValue }}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h5>Possible Variants:</h5>
                  <ul>
                    <li
                      v-for="variant in (
                        variationmatrixStore.variationMatrix || {}
                      ).variants"
                      :key="variant.name"
                    >
                      {{ variant.name }}
                    </li>
                  </ul>
                </div>
              </LoadingSpinner>
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
  onBeforeUnmount,
  watch,
  onServerPrefetch,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { useProductStore, useVariationmatrixStore } from '~/stores/product'
import { useUserStore } from '~/stores/user'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, PRODUCT_PAGE } from '~/stores/page'
import { useErrorHandler } from '~/composables/useErrorHandler'
import Page from '~/components/templates/Page/Page'
import DetailTabs from '~/components/molecules/DetailTabs/DetailTabs.vue'
import ImageGallery from '~/components/organisms/ImageGallery/ImageGallery'
import { storeToRefs } from 'pinia'
import RecommendedAccessories from '~/components/organisms/RecommendedAccessories/RecommendedAccessories'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'

export default defineComponent({
  name: 'ProductShopPage',
  components: {
    Page,
    DetailTabs,
    ImageGallery,
    RecommendedAccessories,
    LoadingSpinner,
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
    const { recommendedAccessories } = useProductStore()
    const loadProduct = () => {
      variationmatrixStore.loadVariationMatrix(route.value.params.product)
      productStore.getProductAccessories()
      redirectOnError(productStore.loadByPath)
    }

    onServerPrefetch(loadProduct)
    onBeforeMount(loadProduct)
    onBeforeUnmount(variationmatrixStore.clearMatrix)
    watch(route, loadProduct)

    /**
     * react to changing user login status
     */
    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    watch(isLoggedIn, loadProduct)

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
