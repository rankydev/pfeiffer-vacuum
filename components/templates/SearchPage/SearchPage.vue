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
              :center="showDocumentSearchTab"
              :back-button-override-query-params="{ currentPage: 1 }"
              class="search-page__result-headline"
            />
          </ContentWrapper>

          <GenericTabs
            v-if="showDocumentSearchTab"
            :tabs="tabNavigationItems"
            :active-tab="currentTabSelected"
            center-mode
            @selectTab="selectTab"
          >
            <template #activeTabContent>
              <div class="search-page__search-result">
                <ContentWrapper>
                  <SearchResult
                    v-if="currentTabSelected === 'products'"
                    persist-category-name-as-query-param
                    v-bind="{
                      products,
                      pagination,
                      categories,
                      facets,
                      currentQuery,
                      sorts,
                    }"
                  />
                  <div v-else>
                    <h2 class="tw-py-6">TODO: Document Search</h2>
                  </div>
                </ContentWrapper>
              </div>
            </template>
          </GenericTabs>

          <div v-else class="category-page__search-result">
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

        <template #stickyBar>
          <Button
            v-if="hasLink"
            class="search-page__sticky-btn"
            :label="$t('navigation.button.overview.label')"
            :href="href"
            variant="secondary"
            shape="outlined"
            cutaway="bottom"
          />
        </template>
      </Page>
    </template>
  </CmsQuery>
</template>

<script>
import {
  onBeforeMount,
  onServerPrefetch,
  defineComponent,
  watch,
  computed,
  useRouter,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'

import Page from '~/components/templates/Page/Page'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import SearchResult from '~/components/organisms/SearchResult/SearchResult'
import GenericTabs from '~/components/molecules/GenericTabs/GenericTabs'

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
    GenericTabs,
  },
  layout: 'default',
  props: {
    showDocumentSearchTab: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const context = useContext()
    const { redirectOnError } = useErrorHandler()

    /**
     * page type handling
     */
    const tabNavigationItems = [
      {
        name: context.i18n.t('category.productsTab'),
        trigger: 'products',
        disabled: false,
      },
      {
        name: context.i18n.t('category.documentsTab'),
        trigger: 'documents',
        disabled: false,
      },
    ]

    const selectTab = (trigger) => {
      router.push({
        query: { ...route.value.query, searchType: trigger },
      })
    }

    const currentTabSelected = computed(
      () => route.value.query?.searchType || 'products'
    )

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
    const categoryStore = useCategoryStore()
    const loadSearchResults = async () => {
      if (currentTabSelected.value === 'products') {
        await redirectOnError(categoryStore.loadByPath)
      } else {
        // TODO: load documents results
      }
    }

    onServerPrefetch(async () => await loadSearchResults())
    onBeforeMount(loadSearchResults)
    watch(route, loadSearchResults)

    /**
     * build the cms slug
     */
    const { buildSlugs } = useStoryblokSlugBuilder({ root: context })

    const { slug, fallbackSlug, language } = buildSlugs(categoryStore.rootUrl)

    /**
     * data to link to category content page
     */
    const { getContentCategoryLink } = useStoryblokData()
    const { href, hasLink } = getContentCategoryLink()

    /**
     * category data
     */
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

      currentTabSelected,
      tabNavigationItems,
      selectTab,
    }
  },
})
</script>

<style lang="scss" scoped>
.search-page {
  &__sticky-btn {
    @apply tw-flex;
    @apply tw-bg-pv-white;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__result-headline {
    @apply tw-mb-12;
    @apply tw-mt-6;

    @screen md {
      @apply tw-mt-8;
    }
  }

  &__search-result {
    @apply tw-bg-pv-grey-96;
  }
}

.category-page {
  &__search-result {
    @apply tw-bg-pv-grey-96;
  }
}
</style>
