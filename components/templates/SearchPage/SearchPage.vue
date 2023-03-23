<template>
  <CmsQuery
    :handle-preview-events="true"
    :slug="slug"
    :fallback-slug="fallbackSlug"
    :language="language"
  >
    <template #default="{ result: { data, loading } }">
      <LoadingSpinner :show="loading" container-min-height>
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
              <div class="search-page__search-input">
                <SearchInputPage
                  v-if="showDocumentSearchTab"
                  :active-tab="currentTabSelected"
                />
              </div>
            </ContentWrapper>

            <GenericTabs
              v-if="showDocumentSearchTab"
              :tabs="tabNavigationItems"
              :active-tab="currentTabSelected"
              :active-tab-initially-open-on-mobile="false"
              center-mode
              @selectTab="selectTab"
            >
              <template #activeTabContent>
                <div class="search-page__search-result">
                  <ContentWrapper v-if="currentTabSelected === 'products'">
                    <SearchResult
                      v-if="products && !hasError"
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
                    <ErrorHandling
                      v-else
                      :headline="
                        $t('product.errorHandling.multiProductHeadline')
                      "
                    />
                  </ContentWrapper>
                  <ContentWrapper v-else no-padding>
                    <DocumentSearchResult />
                  </ContentWrapper>
                </div>
              </template>
            </GenericTabs>

            <div v-else class="category-page__search-result">
              <ContentWrapper>
                <SearchResult
                  v-if="products && !hasError"
                  v-bind="{
                    products,
                    pagination,
                    categories,
                    facets,
                    currentQuery,
                    sorts,
                  }"
                />
                <ErrorHandling
                  v-else
                  :headline="$t('product.errorHandling.multiProductHeadline')"
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
      </LoadingSpinner>
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
  ref,
} from '@nuxtjs/composition-api'
import useStoryblokSlugBuilder from '~/composables/useStoryblokSlugBuilder'
import { useStoryblokData } from '~/composables/useStoryblokData'
import { useCategoryStore } from '~/stores/category/category'
import { usePageStore, CATEGORY_PAGE } from '~/stores/page'
import { useEmpolisStore } from '~/stores/empolis'

import Button from '~/components/atoms/Button/Button'
import ErrorHandling from '~/components/molecules/ErrorHandling/ErrorHandling'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import GenericTabs from '~/components/molecules/GenericTabs/GenericTabs'
import SearchInputPage from '~/components/molecules/SearchInputPage/SearchInputPage'
import SearchResult from '~/components/organisms/SearchResult/SearchResult'
import DocumentSearchResult from '~/components/organisms/DocumentSearchResult/DocumentSearchResult'
import Page from '~/components/templates/Page/Page'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

export default defineComponent({
  name: 'CategoryShopPage',
  components: {
    LoadingSpinner,
    Page,
    Button,
    ErrorHandling,
    ContentWrapper,
    OnPageNavigation,
    ResultHeadline,
    GenericTabs,
    SearchInputPage,
    SearchResult,
    DocumentSearchResult,
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
        // TODO: replace searchterm to the "old one" from the tab to switch to (if one exists?) [PVWEB-546]
        query: {
          searchTerm: route.value.query.searchTerm,
          searchType: trigger,
        },
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
    const empolisStore = useEmpolisStore()

    const hasError = ref(false)

    const loadSearchResults = async () => {
      if (currentTabSelected.value === 'products') {
        try {
          await categoryStore.loadByPath()
        } catch (e) {
          hasError.value = true
        }
      } else if (currentTabSelected.value === 'documents') {
        await empolisStore.loadByPath()
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
    const searchTerm = computed(() => route.value.query.searchTerm || '')
    const link = computed(() => categoryStore.parentCategoryPath)
    const count = computed(() => categoryStore.result?.pagination?.totalResults)
    const products = computed(() => categoryStore.result?.products)
    const pagination = computed(() => categoryStore.result?.pagination || {})
    const categories = computed(() => categoryStore.result?.categorySubtree)
    const facets = computed(() => categoryStore.result?.facets || [])
    const currentQuery = computed(() => categoryStore.result?.currentQuery)
    const sorts = computed(() => categoryStore.result?.sorts)
    const metaData = computed(() => categoryStore.metaData)
    const headline = computed(() =>
      route.value.query?.searchType === 'documents'
        ? context.i18n.t('category.documents.allDocuments')
        : categoryStore.categoryName
    )

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
      hasError,
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

  &__search {
    &-result {
      @apply tw-bg-pv-grey-96;
    }

    &-input {
      @apply tw-relative;
      @apply tw-mb-4;
      @apply tw-mx-auto;

      @screen md {
        max-width: 534px;
      }

      @screen lg {
        @apply tw-mb-8;
        max-width: 672px;
      }
    }
  }
}

.category-page {
  &__search-result {
    @apply tw-bg-pv-grey-96;
  }
}
</style>
