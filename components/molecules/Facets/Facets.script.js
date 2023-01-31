import { ref, toRefs, computed, useContext } from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Button from '~/components/atoms/Button/Button'
import VacuumRangeSlider from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.vue'
import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection'
import FilterTag from '~/components/atoms/FilterTag/FilterTag'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import Popup from '~/components/atoms/Popup/Popup'
import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper'
import {
  useRangeSliderHandling,
  vacuumRangeIds,
  suctionSpeedIds,
  suctionSpeedUnit,
  vacuumRangeUnit,
} from './partials/useRangeSliderHandling'
import { useFacetActions } from './partials/useFacetActions'

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
    InternalBtnWrapper,
  },
  props: {
    /**
     * All facets given by hybris
     */
    facets: {
      type: Array,
      required: true,
    },
    /**
     * All available sorts
     */
    sorts: {
      type: Array,
      required: true,
    },
    /**
     * Current hybris query with e.g. active filter terms
     */
    currentQuery: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['updateSort', 'updateFacets'],
  setup(props, { emit }) {
    const { app } = useContext()
    const { currentQuery, facets } = toRefs(props)

    // Switch for showing less or more filters
    const isExtended = ref(false)

    // Generate array with current selected facets from given currentQuery
    const selectedFacets = computed(() => {
      const arr =
        currentQuery.value?.query?.filterTerms?.filter(
          (e) => e.key !== 'category'
        ) || []

      arr.forEach((el) => {
        // Remove min/max from displayName string
        if ([...vacuumRangeIds, ...suctionSpeedIds].includes(el.key)) {
          el.displayName = el.displayName.replaceAll(/,?\s(min|max)/g, '')
        }

        // Add suction speed unit if not present
        if (
          suctionSpeedIds.includes(el.key) &&
          !el.value.includes(suctionSpeedUnit)
        ) {
          el.value += suctionSpeedUnit
        }

        // Add vacuum range unit if not present
        if (
          vacuumRangeIds.includes(el.key) &&
          !el.value.includes(vacuumRangeUnit)
        ) {
          el.value += vacuumRangeUnit
        }
      })

      return arr
    })

    const {
      vacuumRange,
      suctionSpeed,
      isVacuumRangePresent,
      isSuctionSpeedPresent,
      isVacuumRangeActive,
      isSuctionSpeedActive,
    } = useRangeSliderHandling(currentQuery, facets, selectedFacets)

    const { updateFacets, removeFacet } = useFacetActions(selectedFacets, emit)

    // Filter given facets to only have type multiselect
    const multiSelectFacets = computed(
      () =>
        facets.value?.filter(
          (e) => e.visible && !e.category && e.facetType === 'MULTISELECTOR'
        ) || []
    )

    // On desktop these are initially 2 facets when not opened, otherwise it returns all
    // On mobile all facets will be returned
    const shrinkedFacets = computed(() =>
      app.$breakpoints.isMobile.value
        ? multiSelectFacets.value
        : multiSelectFacets.value.slice(0, isExtended.value ? undefined : 2) ||
          []
    )

    return {
      isExtended,
      multiSelectFacets,
      shrinkedFacets,
      selectedFacets,
      vacuumRange,
      isVacuumRangePresent,
      isSuctionSpeedPresent,
      isVacuumRangeActive,
      isSuctionSpeedActive,
      suctionSpeed,
      updateFacets,
      removeFacet,
    }
  },
}
