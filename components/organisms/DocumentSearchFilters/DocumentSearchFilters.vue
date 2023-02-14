<template>
  <div class="document-search-filters">
    <FilterModal :label="$t('category.documents.filter')">
      <template #default="{ close }">
        <div class="document-search-filters__dropdowns">
          <Popup v-for="group in filterTreeGroups" :key="group.attribute">
            <template #activator="{ togglePopup }">
              <InternalBtnWrapper
                :label="group.label"
                variant="secondary"
                shape="outlined"
                size="xsmall"
                icon="arrow_drop_down"
                class="document-search-filters__popup-trigger"
                @click="togglePopup"
              />
            </template>
            <template #default="{ closePopup }">
              <MultilevelDropdown
                :options="group.filters"
                class="document-search-filters__popup"
                @update="
                  (payload) => {
                    clickedFilterTreeItem(payload), closePopup(), close()
                  }
                "
              />
            </template>
          </Popup>
        </div>
      </template>
    </FilterModal>
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
        @click="addFilter(filter)"
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
import MultilevelDropdown from '~/components/atoms/MuiltilevelDropdown/MultilevelDropdown.vue'
import Popup from '~/components/atoms/Popup/Popup.vue'
import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper.vue'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'

export default defineComponent({
  name: 'DocumentSearchFilters',
  components: {
    FilterTag,
    MultilevelDropdown,
    Popup,
    InternalBtnWrapper,
    FilterModal,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const empolisStore = useEmpolisStore()
    const { filterSuggestions, activeFilters, availableFilters } =
      storeToRefs(empolisStore)

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
              attribute: group.attribute,
            }
          })
        })
        .flat()
    })

    const filterSuggestionsItems = computed(() => {
      if (!filterSuggestions.value?.length) {
        return []
      }

      return (
        filterSuggestions.value
          // do not show already active filters
          .filter((suggestionItem) => {
            return !activeFilterItems.value.find((activeItem) => {
              return (
                activeItem.attribute === suggestionItem.attribute &&
                activeItem.id === suggestionItem.value
              )
            })
          })
          // keep filter items consistent and use id as in active filter and filter group trees
          .map((item) => {
            return {
              ...item,
              id: item.value,
            }
          })
      )
    })

    const filterTreeGroups = computed(() => {
      if (!availableFilters.value?.length) {
        return []
      }

      return availableFilters.value.map((group) => {
        // only store relevant info for tree
        const concepts = group.concepts.map((item) => {
          return {
            // label: `${item.label} (${item.count})`, // could display count here. But numbers are only correct if no searchTerm text
            label: item.label,
            checked: item.checked,
            id: item.id,
            parentId: item.parentId,
            attribute: group.attribute,
          }
        })

        // do the deep structuring of elements
        // since objects are references we can safely extend out single objects with concepts arrays
        for (let index = 0; index < concepts.length; index++) {
          const element = concepts[index]
          if (element.parentId) {
            const parent = concepts.find((item) => item.id === element.parentId)
            if (parent) {
              if (parent.concepts) {
                parent.concepts.push(element)
              } else {
                parent.concepts = [element]
              }
            }
          }
        }

        // only store root elements in first data layer
        // all nested childs are now in "concepts" stored
        const rootOnlyFilters = concepts.filter((item) => !item.parentId)

        return {
          label: group.label,
          attribute: group.attribute,
          filters: rootOnlyFilters,
        }
      })
    })

    const clickedFilterTreeItem = (item) => {
      if (item.checked) {
        removeActiveFilter(item)
      } else {
        addFilter(item)
      }
    }

    const addFilter = (item) => {
      const newRouteFilter = structuredClone(routeFilter.value)

      if (item.attribute in newRouteFilter) {
        newRouteFilter[item.attribute].push(item.id)
      } else {
        newRouteFilter[item.attribute] = [item.id]
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

      if (newRouteFilter[item.attribute]) {
        if (newRouteFilter[item.attribute].length === 1) {
          delete newRouteFilter[item.attribute]
        } else {
          newRouteFilter[item.attribute] = newRouteFilter[
            item.attribute
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
      filterTreeGroups,
      filterSuggestionsItems,
      activeFilterItems,
      addFilter,
      removeActiveFilter,
      clickedFilterTreeItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.document-search-filters {
  &__suggested-label {
    @apply tw-font-bold;
  }

  &__dropdowns,
  &__suggested,
  &__active {
    @apply tw-mt-3;
    @apply tw-flex;
    @apply tw-gap-2;
    @apply tw-flex-col;
    @apply tw-items-stretch;

    @screen md {
      @apply tw-flex-row;
      @apply tw-items-center;
    }
  }

  &__active {
    @apply tw-mt-5;

    @screen md {
      @apply tw-mt-3;
    }
  }

  &__popup {
    @apply tw-p-4;

    /* viewport minus paddings minus border */
    max-width: calc(100vw - 4.25rem);
    width: calc(100vw - 4.25rem);

    @screen md {
      @apply tw-w-auto;
    }
  }
}
</style>
