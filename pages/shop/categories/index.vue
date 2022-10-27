<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data } }">
      <Page v-if="data" v-bind="data" :meta-data="metaData">
        <template #onPageNavigation>
          <OnPageNavigation v-bind="(data.quicklinks || [])[0]">
            <Button
              v-if="hasLink"
              :label="$t('navigation.button.overview.label')"
              :href="href"
              size="small"
              variant="secondary"
              shape="outlined"
            />
          </OnPageNavigation>
        </template>

        <template #default>
          <ContentWrapper>
            <ResultHeadline
              v-bind="{ headline, link, searchTerm }"
              :result-count="count"
            />
          </ContentWrapper>

          <div class="category-page__search-result">
            <ContentWrapper>
              <SearchResult
                v-bind="{
                  products,
                  pagination,
                  categories,
                  facets,
                  currentQuery,
                  sorts,
                }"
              />
            </ContentWrapper>
          </div>
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import { defineComponent, watch, computed } from '@nuxtjs/composition-api'
import { onBeforeMount, onServerPrefetch } from '@nuxtjs/composition-api'
import { useRoute, useContext } from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import SearchResult from '~/components/organisms/SearchResult/SearchResult.vue'

import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { useCategoryStore } from '~/stores/category/category'
import { usePageStore, CATEGORY_PAGE } from '~/stores/page'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { useStoryblokData } from '~/composables/useStoryblokData'

export default defineComponent({
  name: 'CategoryShopPage',
  components: {
    Page,
    Button,
    ContentWrapper,
    OnPageNavigation,
    ResultHeadline,
    SearchResult,
  },
  layout: 'default',
  setup() {
    const route = useRoute()
    const context = useContext()
    const { redirectOnError } = useErrorHandler()

    /**
     * Set the type of the pages, enabling components
     * like the breadcrumb to retrieve the correct data
     */
    const pageStore = usePageStore()
    pageStore.setPageType(CATEGORY_PAGE)

    /**
     * Load the category data on each route change
     * Redirects to the error page if category was not found
     */
    const catgeoryStore = useCategoryStore()
    const loadCategory = () => redirectOnError(catgeoryStore.loadByPath)

    onServerPrefetch(loadCategory)
    onBeforeMount(loadCategory)
    watch(route, loadCategory)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })
    const path = context.app.localePath('shop-categories')
    const { slug, fallbackSlug, language } = buildSlugs(path)

    /**
     * data to link to category content page
     */
    const { getContentCategoryLink } = useStoryblokData()
    const { href, hasLink } = getContentCategoryLink()

    /**
     * category data
     */
    const categoryStore = useCategoryStore()
    const headline = computed(() => categoryStore.categoryName)
    const searchTerm = computed(() => categoryStore.searchTerm || '')
    const link = computed(() => categoryStore.parentCategoryPath)
    const count = computed(() => categoryStore.result?.pagination?.totalResults)
    const products = computed(() => categoryStore.result?.products)
    const pagination = computed(() => categoryStore.result?.pagination || {})
    const categories = computed(() => categoryStore.result?.categorySubtree)
    const facets = computed(() => categoryStore.result?.facets || [])
    const currentQuery = computed(() => categoryStore.result?.currentQuery)
    const sorts = computed(() => categoryStore.result?.sorts)
    const metaData = computed(() => categoryStore.metaData)

    return {
      slug,
      fallbackSlug,
      language,

      hasLink,
      href,

      headline,
      searchTerm,
      link,
      count,
      products,
      pagination,
      categories,
      facets,
      currentQuery,
      sorts,
      metaData,
    }
  },
})
</script>

<style lang="scss">
.category-page {
  &__search-result {
    @apply tw-bg-pv-grey-96;
  }
}
</style>
