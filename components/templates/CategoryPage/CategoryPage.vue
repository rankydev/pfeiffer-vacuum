<template>
  <Page :content="content">
    <template #onPageNavigation>
      <OnPageNavigation v-bind="(quicklinks || [])[0]">
        <Button
          v-if="hasLinkedCat"
          :label="$t('navigation.button.overview.label')"
          :href="categoryHref"
          size="small"
          variant="secondary"
          shape="outlined"
        />
      </OnPageNavigation>
    </template>

    <template #default>
      <main>
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
      </main>
    </template>

    <template #stickyBar>
      <Button
        v-if="hasLinkedCat"
        class="category-page__sticky-btn"
        :label="$t('navigation.button.overview.label')"
        :href="categoryHref"
        variant="secondary"
        shape="outlined"
      />
    </template>
  </Page>
</template>

<script>
import {
  ssrRef,
  onBeforeMount,
  onServerPrefetch,
  defineComponent,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import Page from '~/components/templates/Page/Page'
import Button from '~/components/atoms/Button/Button'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'

import schema from '~/components/templates/CategoryContentPage/CategoryContentPage.schema.js'
import { useCategoryStore } from '~/stores/category'
import SearchResult from '~/components/organisms/SearchResult/SearchResult.vue'
import { transformUrl } from '~/resolver/linksTransformer.js'
import { joinURL } from 'ufo'

export default defineComponent({
  name: 'CategoryPage',
  components: {
    Page,
    Button,
    ContentWrapper,
    OnPageNavigation,
    ResultHeadline,
    SearchResult,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
  },
  setup(props) {
    /**
     * data to link to category content page
     */
    const context = useContext()
    const { route, $cms, i18n } = context

    const fetched = ssrRef(false)
    const categoryHref = ssrRef(null)
    const hasLinkedCat = computed(() => !!categoryHref.value)
    const categoryKey = computed(() => route.value.params.category)

    const fetchAssociatedCategory = async () => {
      if (fetched.value || !categoryKey.value) return

      const options = {
        excluding_fields: Object.keys(schema.schema).join(','),
        per_page: 1,
        filter_query: {
          categoryShopId: {
            like: categoryKey.value,
          },
        },
      }
      const { data } = await $cms.query({ options })

      fetched.value = true

      if (!data?.[0]?.full_slug) return

      const fullSlug = joinURL(i18n.locale, data[0].full_slug)
      categoryHref.value = transformUrl(fullSlug, context)
    }

    onServerPrefetch(fetchAssociatedCategory)
    onBeforeMount(fetchAssociatedCategory)

    /**
     * category data to show headline
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

    return {
      hasLinkedCat,
      categoryHref,

      quicklinks: props.content.quicklinks,
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
    }
  },
})
</script>

<style lang="scss">
.category-page {
  &__search-result {
    @apply tw-bg-pv-grey-96;
  }

  &__sticky-btn {
    @apply tw-bg-pv-white;
    @screen md {
      @apply tw-hidden;
    }
  }
}
</style>
