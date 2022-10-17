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
