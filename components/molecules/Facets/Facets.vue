<template>
  <div class="facets">
    <div>
      <VacuumRangeSlider
        style="margin-bottom: 32px"
        @update="updateFacets(null, $event, true)"
      />
      <SuctionSpeedSelection
        style="margin-bottom: 32px"
        @update="updateFacets(null, $event, false, true)"
      />
    </div>
    <div v-if="activeFilters.length" class="facets__filter-tags">
      <span class="facets__filter-tags-label">Aktive Filter:</span>
      <FilterTag
        v-for="filter in activeFilters"
        :key="filter.key + filter.value"
        :filter="filter.displayName"
        :value="filter.value"
        @click="removeFacet(filter)"
      />
    </div>
    <div class="facets__selects">
      <PvSelect
        :options="sorts"
        :value="sorts.find((e) => e.selected)"
        :clearable="false"
        option-label="name"
        :prepend-label="$t('category.sort')"
        icon-size="small"
        class="facets__multiselect"
        no-input
        @update="$emit('updateSort', $event)"
      />
      <PvSelect
        v-for="facet in multiSelectFacets"
        :key="facet.code"
        :value="facet.values.filter((e) => e.selected)"
        :placeholder="facet.name"
        :options="facet.values"
        option-label="name"
        icon-size="small"
        class="facets__multiselect"
        multiple
        no-input
        @update="updateFacets(facet.code, $event)"
      />
      <Button
        :label="
          isExtended ? $t('category.lessFilters') : $t('category.moreFilters')
        "
        variant="secondary"
        shape="outlined"
        icon="filter_list"
        gap="narrow"
        class="facets__expand-toggle"
        size="xsmall"
        @click="isExtended = !isExtended"
      />
    </div>
  </div>
</template>
<script>
import { unref, ref, computed } from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Button from '~/components/atoms/Button/Button'
import VacuumRangeSlider from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.vue'
import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection'
import FilterTag from '~/components/atoms/FilterTag/FilterTag'

export default {
  name: 'Facets',
  components: {
    PvSelect,
    Button,
    VacuumRangeSlider,
    SuctionSpeedSelection,
    FilterTag,
  },
  props: {
    facets: {
      type: Array,
      required: true,
    },
    sorts: {
      type: Array,
      required: true,
    },
    currentQuery: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['updateSort', 'updateFacets'],
  setup(props, { emit }) {
    // Facet id's for vacuum range and suction speed
    const vacuumRangeIds = ['3913', '3912']
    const suctionSpeedIds = ['3983', '3982']

    // Switch for showing less or more filters
    const isExtended = ref(false)

    // Filter given facets to only have type multiselect
    const multiSelectFacets = computed(() => {
      return (
        props.facets
          ?.filter(
            (e) => e.visible && !e.category && e.facetType === 'MULTISELECTOR'
          )
          .slice(0, isExtended.value ? undefined : 3) || []
      )
    })

    // Generate array with current selected facets from given currentQuery
    const selectedFacets = computed(() => {
      return (
        props.currentQuery?.query?.filterTerms?.filter(
          (e) => e.key !== 'category'
        ) || []
      )
    })

    const activeFilters = computed(
      () => props.currentQuery?.query?.filterTerms || []
    )

    // Add recent selected facet and values to current selection and emit
    const updateFacets = (
      code,
      values,
      vacuumRange = false,
      suctionSpeed = false
    ) => {
      let newFacets
      if (vacuumRange || suctionSpeed) {
        // Vacuum range or suction speed was updated
        const sliderIds = vacuumRange ? vacuumRangeIds : suctionSpeedIds

        newFacets = unref(selectedFacets).filter(
          (e) => !sliderIds.includes(e.key)
        )

        values.forEach((item, i) => {
          if (!item) return
          newFacets.push({ key: sliderIds[i], value: item })
        })
      } else {
        // Any other normal facet was updated
        newFacets = unref(selectedFacets).filter((e) => e.key !== code)

        values.forEach((item) => {
          newFacets.push({ key: code, value: item.name })
        })
      }

      emit('updateFacets', newFacets)
    }

    const removeFacet = (facet) => {
      emit(
        'updateFacets',
        unref(selectedFacets).filter((e) => e !== facet)
      )

      console.log(unref(selectedFacets).filter((e) => e !== facet))
    }

    return {
      isExtended,
      multiSelectFacets,
      activeFilters,
      updateFacets,
      removeFacet,
    }
  },
}
</script>
<style lang="scss">
.facets {
  &__selects {
    @apply tw-flex;
    @apply tw-gap-2;
    @apply tw-flex-wrap;
  }

  &__multiselect {
    @apply tw-inline-block;

    .vs__dropdown-toggle {
      @apply tw-p-2;
      @apply tw-text-xs;
    }
  }

  &__expand-toggle {
    @apply tw-p-2;
  }

  &__filter-tags {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-gap-2;
    @apply tw-mb-4;

    &-label {
      @apply tw-font-bold;
    }
  }
}
</style>
