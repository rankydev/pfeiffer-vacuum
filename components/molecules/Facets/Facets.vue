<template>
  <div class="facets">
    <div v-if="selectedFacets.length" class="facets__filter-tags">
      <span class="facets__filter-tags-label">
        {{ $t('category.activeFilters') }}
      </span>
      <FilterTag
        v-for="filter in selectedFacets"
        :key="filter.key + filter.value"
        class="facets__filter-tag-item"
        :filter="filter.displayName"
        :value="filter.value"
        @click="removeFacet(filter)"
      />
    </div>
    <FilterModal>
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
        <Popup v-if="vacuumRangePresent">
          <template #activator="{ togglePopup }">
            <Button
              :class="[
                'facets__slider-buttons',
                { 'facets__slider-buttons--active': vacuumRangeActive },
              ]"
              label="Vacuum Range"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <template>
            <div class="facets__vacuum-range-popup">
              <VacuumRangeSlider @update="updateFacets(null, $event, true)" />
            </div>
          </template>
        </Popup>
        <Popup v-if="suctionSpeedPresent">
          <template #activator="{ togglePopup }">
            <Button
              :class="[
                'facets__slider-buttons',
                { 'facets__slider-buttons--active': suctionSpeedActive },
              ]"
              label="Suction Speed"
              variant="secondary"
              shape="outlined"
              size="xsmall"
              icon="arrow_drop_down"
              @click="togglePopup"
            />
          </template>
          <template>
            <div class="facets__suction-speed-popup">
              <SuctionSpeedSelection
                @update="updateFacets(null, $event, false, true)"
              />
            </div>
          </template>
        </Popup>
        <PvSelect
          v-for="facet in shrinkedFacets"
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
          v-if="multiSelectFacets.length > 2"
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
    </FilterModal>
  </div>
</template>
<script>
import { unref, ref, computed, useContext } from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Button from '~/components/atoms/Button/Button'
import VacuumRangeSlider from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.vue'
import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection'
import FilterTag from '~/components/atoms/FilterTag/FilterTag'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import Popup from '~/components/atoms/Popup/Popup'

export default {
  name: 'Facets',
  components: {
    PvSelect,
    Button,
    VacuumRangeSlider,
    SuctionSpeedSelection,
    FilterTag,
    FilterModal,
    Popup,
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
    const { app } = useContext()

    // Facet id's for vacuum range and suction speed
    const vacuumRangeIds = ['3913', '3912']
    const suctionSpeedIds = ['3983', '3982']

    // Switch for showing less or more filters
    const isExtended = ref(false)

    // Filter given facets to only have type multiselect
    const multiSelectFacets = computed(() => {
      return props.facets?.filter(
        (e) =>
          (e.visible && !e.category && e.facetType === 'MULTISELECTOR') || []
      )
    })

    const shrinkedFacets = computed(() =>
      app.$breakpoints.isMobile.value
        ? multiSelectFacets.value
        : multiSelectFacets.value.slice(0, isExtended.value ? undefined : 2) ||
          []
    )

    // Generate array with current selected facets from given currentQuery
    const selectedFacets = computed(() => {
      return (
        props.currentQuery?.query?.filterTerms?.filter(
          (e) => e.key !== 'category'
        ) || []
      )
    })

    const vacuumRangePresent = computed(() => {
      return !!props.facets?.filter((e) => vacuumRangeIds.includes(e.code))
    })

    const suctionSpeedPresent = computed(() => {
      return !!props.facets?.filter((e) => suctionSpeedIds.includes(e.code))
    })

    const vacuumRangeActive = computed(() => {
      return !!selectedFacets.value.filter((e) =>
        vacuumRangeIds.includes(e.key)
      ).length
    })

    const suctionSpeedActive = computed(() => {
      return !!selectedFacets.value.filter((e) =>
        suctionSpeedIds.includes(e.key)
      ).length
    })

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
    }

    return {
      isExtended,
      multiSelectFacets,
      shrinkedFacets,
      selectedFacets,
      vacuumRangeIds,
      suctionSpeedIds,
      vacuumRangePresent,
      suctionSpeedPresent,
      vacuumRangeActive,
      suctionSpeedActive,
      updateFacets,
      removeFacet,
    }
  },
}
</script>
<style lang="scss">
.facets {
  @apply tw-flex;
  @apply tw-flex-col-reverse;

  @screen md {
    @apply tw-flex-col;
  }

  &__selects {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-2;
    @apply tw-flex-wrap;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__multiselect {
    @apply tw-inline-block;

    .vs__dropdown-toggle {
      @apply tw-p-2;
      @apply tw-text-xs;
    }
  }

  &__expand-toggle {
    @apply tw-hidden;
    @apply tw-p-2;

    @screen md {
      @apply tw-inline-flex;
    }
  }

  &__filter-tags {
    @apply tw-flex;
    @apply tw-flex-wrap;
    @apply tw-items-center;
    @apply tw-gap-2;
    @apply tw-mt-4;

    @screen md {
      @apply tw-mt-0 tw-mb-4;
    }

    &-label {
      @apply tw-hidden;
      @apply tw-font-bold;

      @screen md {
        @apply tw-inline-block;
      }
    }
  }

  &__filter-tag-item {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-auto;
    }
  }

  &__slider-buttons {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-auto;
    }

    &.button--outlined.button--secondary {
      @apply tw-p-2;
      @apply tw-text-xs;
      @apply tw-font-normal;
      @apply tw-text-pv-grey-64;
      @apply tw-shadow-border-grey-80;

      &:hover,
      &:focus {
        @apply tw-bg-pv-transparent;
        @apply tw-outline-pv-transparent;
      }

      &:focus {
        @apply tw-shadow-border-grey-16;
      }
    }

    &--active.button--outlined.button--secondary {
      @apply tw-text-pv-grey-16;
    }
  }

  &__vacuum-range-popup {
    @apply tw-px-12 tw-py-4;
  }

  &__suction-speed-popup {
    @apply tw-p-4;
  }
}
</style>
