<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data" :meta-data="productStore.metaData">
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

            <div
              class="tw-min-w-full md:tw-min-w-0 tw-bg-pv-grey-88 tw-flex-1 tw-rounded-lg"
              :class="'tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-5xl tw-text-center'"
              style="aspect-ratio: 100 / 73"
            >
              Image
            </div>
            <div
              id="variantselection"
              class="tw-bg-pv-grey-88 tw-w-full md:tw-w-1/2 lg:tw-w-5/12 tw-rounded-lg"
              :class="'tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-5xl tw-text-center'"
              style="height: 600px"
            >
              Variant Selection
            </div>
            <GenericTable />
            <div
              class="tw-bg-pv-grey-88 tw-w-full tw-rounded-lg"
              :class="'tw-flex tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-5xl tw-text-center'"
              style="height: 350px"
            >
              Recommended Accessories
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
} from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { usePageStore, PRODUCT_PAGE } from '~/stores/page'
import { useErrorHandler } from '~/composables/useErrorHandler'
import Page from '~/components/templates/Page/Page'
import DetailTabs from '~/components/molecules/DetailTabs/DetailTabs.vue'
import GenericTable from '~/components/molecules/GenericTable/GenericTable.vue'

export default defineComponent({
  name: 'ProductShopPage',
  components: { Page, DetailTabs, GenericTable },
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
    const loadProduct = () => redirectOnError(productStore.loadByPath)

    onServerPrefetch(loadProduct)
    onBeforeMount(loadProduct)
    watch(route, loadProduct)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const path = context.app.localePath('shop-products-product')
    const { slug, fallbackSlug, language } = buildSlugs(path)

    return {
      slug,
      fallbackSlug,
      language,

      productStore,
    }
  },
})
</script>
