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

          <div v-if="showDocumentSearchTab" class="tab-navigation-desktop">
            <Button
              v-for="tab in tabNavigationItems"
              :key="tab.key"
              :label="tab.name"
              :variant="
                currentTabSelected === tab.key ? 'secondary' : 'inverted'
              "
              cutaway="bottom"
              text-center
              class="tab-navigation-desktop__item"
              :class="{ active: currentTabSelected === tab.key }"
              @click="selectTab(tab)"
            />
          </div>

          <div class="search-page__search-result-desktop">
            <ContentWrapper>
              <SearchResult
                v-if="currentTabSelected === 'products'"
                :persist-category-name-as-query-param="showDocumentSearchTab"
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
                <h2 class="tw-my-6">TODO: Document Search</h2>
              </div>
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
import { defineComponent, watch, computed, ref } from '@nuxtjs/composition-api'
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
  props: {
    showDocumentSearchTab: {
      type: Boolean,
      default: false,
    },
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
    pageStore.setPageType(CATEGORY_PAGE)

    /**
     * Load the category data on each route change
     * Redirects to the error page if category was not found
     */
    const categoryStore = useCategoryStore()
    const loadCategory = () => redirectOnError(categoryStore.loadByPath)

    onServerPrefetch(loadCategory)
    onBeforeMount(loadCategory)
    watch(route, loadCategory)

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

    /**
     * page type handling
     */
    const currentTabSelected = ref('products')

    const tabNavigationItems = [
      {
        name: context.i18n.t('category.productsTab'),
        key: 'products',
      },
      {
        name: context.i18n.t('category.documentsTab'),
        key: 'documents',
      },
    ]

    const selectTab = (tab) => {
      currentTabSelected.value = tab.key
      // TODO: also handle switching tab contents (display docs component, fetch search results, ...)
    }

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
  &__search-result-desktop {
    @apply tw-bg-pv-grey-96;
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }
  }

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
}

.tab-navigation-desktop {
  @apply tw-hidden;

  @screen md {
    @apply tw-flex;
    @apply tw-flex-row;
    @apply tw-justify-center;
    @apply tw-border-b-2;
    @apply tw-border-pv-red;
    @apply tw-w-full;
    @apply tw-overflow-y-auto;
    @apply tw-gap-2;
  }

  &__item {
    min-width: 120px;
  }
}
</style>
