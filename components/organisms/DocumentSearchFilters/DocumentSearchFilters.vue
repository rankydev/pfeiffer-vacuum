<template>
  <div class="document-search-filters">
    <div
      v-if="filterSuggestionsItems && filterSuggestionsItems.length"
      class="document-search-filters__suggested"
    >
      <span class="document-search-filters__suggested-label"
        >{{ $t('category.documents.possibleFilters') }}:</span
      >
      <FilterTag
        v-for="filter in filterSuggestionsItems"
        :key="filter.key + filter.value"
        :filter="filter.classLabel"
        :value="filter.label"
        is-suggestion
        class="document-search-filters__filter-tag"
        @click="addSuggestedFilter(filter)"
      />
    </div>
    <div
      v-if="activeFilterItems && activeFilterItems.length"
      class="document-search-filters__active"
    >
      <FilterTag
        v-for="filter in activeFilterItems"
        :key="filter.id + filter.value"
        :filter="filter.groupLabel"
        :value="filter.label"
        class="document-search-filters__filter-tag"
        @click="removeActiveFilter(filter)"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useRouter,
  useRoute,
} from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useEmpolisStore } from '~/stores/empolis'

import FilterTag from '~/components/atoms/FilterTag/FilterTag'

export default defineComponent({
  name: 'DocumentSearchFilters',
  components: {
    FilterTag,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const empolisStore = useEmpolisStore()
    const { filterSuggestions, activeFilters } = storeToRefs(empolisStore)

    const routeFilter = computed(() =>
      route.value.query?.filter
        ? JSON.parse(route.value.query.filter.toString())
        : {}
    )

    const activeFilterItems = computed(() => {
      if (!activeFilters.value?.length) {
        return []
      }

      return activeFilters.value
        .map((group) => {
          return group.concepts.map((item) => {
            return {
              ...item,
              groupLabel: group.label,
              groupAttribute: group.attribute,
            }
          })
        })
        .flat()
    })

    const filterSuggestionsItems = computed(() => {
      if (!filterSuggestions.value?.length) {
        return []
      }

      return filterSuggestions.value.filter((suggestionItem) => {
        return !activeFilterItems.value.find((activeItem) => {
          return (
            activeItem.groupAttribute === suggestionItem.attribute &&
            activeItem.id === suggestionItem.value
          )
        })
      })
    })

    const addSuggestedFilter = (item) => {
      const newRouteFilter = structuredClone(routeFilter.value)

      if (item.attribute in newRouteFilter) {
        newRouteFilter[item.attribute].push(item.value)
      } else {
        newRouteFilter[item.attribute] = [item.value]
      }

      router.push({
        query: {
          ...(route.value.query || {}),
          filter: JSON.stringify(newRouteFilter),
        },
      })
    }

    const removeActiveFilter = (item) => {
      const newRouteFilter = structuredClone(routeFilter.value)

      if (newRouteFilter[item.groupAttribute]) {
        if (newRouteFilter[item.groupAttribute].length === 1) {
          delete newRouteFilter[item.groupAttribute]
        } else {
          newRouteFilter[item.groupAttribute] = newRouteFilter[
            item.groupAttribute
          ].filter((e) => e !== item.id)
        }
      }

      router.push({
        query: {
          ...(route.value.query || {}),
          filter: JSON.stringify(newRouteFilter),
        },
      })
    }

    return {
      filterSuggestionsItems,
      activeFilterItems,
      addSuggestedFilter,
      removeActiveFilter,
    }
  },
})
</script>

<style lang="scss" scoped>
.document-search-filters {
  &__suggested-label {
    @apply tw-font-bold;
  }

  &__suggested,
  &__active {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @apply tw-gap-2;
  }

  &__active {
    @apply tw-mt-3;
  }
}
</style>
