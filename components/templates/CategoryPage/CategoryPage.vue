<template>
  <div class="page-template">
    <slot name="header">
      <nuxt-dynamic
        v-for="item in top"
        :key="item._uid"
        v-editable="item"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />

      <nuxt-dynamic
        v-for="item in header"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>

    <slot name="onPageNavigation">
      <OnPageNavigation v-bind="(quicklinks || [])[0]" />
    </slot>

    <slot>
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
    </slot>

    <slot name="footer">
      <ContentWrapper>
        <nuxt-dynamic
          v-for="item in bottom"
          :key="item._uid"
          v-editable="item"
          v-bind="item"
          :name="item.uiComponent || item.component"
        />
      </ContentWrapper>

      <nuxt-dynamic
        v-for="item in footer"
        :key="item._uid"
        v-bind="item"
        :name="item.uiComponent || item.component"
      />
    </slot>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  inject,
  toRefs,
} from '@nuxtjs/composition-api'
import useMeta from '~/composables/useMeta'
import useTemplating from '~/composables/useTemplating'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import OnPageNavigation from '~/components/molecules/OnPageNavigation/OnPageNavigation.vue'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import { useCategoryStore } from '~/stores/category'
import SearchResult from '~/components/organisms/SearchResult/SearchResult.vue'

export default defineComponent({
  name: 'CategoryPage',
  components: {
    ContentWrapper,
    OnPageNavigation,
    ResultHeadline,
    SearchResult,
  },
  props: {
    content: {
      type: Object,
      default: /* istanbul ignore next */ () => {},
    },
  },
  setup(props, context) {
    const { content } = toRefs(props)
    const translatedSlugs = inject('getTranslatedSlugs', () => [])()
    const defaultFullSlug = inject('getDefaultFullSlug', () => '')()
    const { top, header, bottom, footer } = useTemplating(content)
    const { getMetaData } = useMeta(
      content,
      defaultFullSlug,
      translatedSlugs,
      context
    )

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
    const facets = computed(() => categoryStore.result?.facets)
    const currentQuery = computed(() => categoryStore.result?.currentQuery)
    const sorts = computed(() => categoryStore.result?.sorts)

    return {
      top,
      header,
      bottom,
      footer,
      quicklinks: content.value.quicklinks,
      metaData: getMetaData(),
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
  head() {
    return this.metaData
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
