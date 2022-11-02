import {
  unref,
  ref,
  toRefs,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
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

    // Facet id's for vacuum range and suction speed
    const vacuumRangeIds = ['3913', '3912']
    const suctionSpeedIds = ['3983', '3982']

    // Unit for suction speed, which will be set by frontend
    const suctionSpeedUnit = 'm<sup>3</sup>/h'

    // Switch for showing less or more filters
    const isExtended = ref(false)

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
          el.value += ` ${suctionSpeedUnit}`
        }
      })

      return arr
    })

    const vacuumRange = computed(() => {
      const lower = currentQuery.value?.query?.filterTerms?.find(
        (e) => e.key === vacuumRangeIds[0]
      )
      const upper = currentQuery.value?.query?.filterTerms?.find(
        (e) => e.key === vacuumRangeIds[1]
      )

      return [lower?.value, upper?.value]
    })

    const suctionSpeed = computed(() => {
      let lower = currentQuery.value?.query?.filterTerms?.find(
        (e) => e.key === suctionSpeedIds[0]
      )
      let upper = currentQuery.value?.query?.filterTerms?.find(
        (e) => e.key === suctionSpeedIds[1]
      )

      const reg = new RegExp(`(<|>)=|${suctionSpeedUnit}|\\s`, 'g')

      lower = lower?.value?.replace(reg, '')
      upper = upper?.value?.replace(reg, '')

      return [lower, upper]
    })

    const vacuumRangePresent = computed(
      () => !!facets.value?.filter((e) => vacuumRangeIds.includes(e.code))
    )

    const suctionSpeedPresent = computed(
      () => !!facets.value?.filter((e) => suctionSpeedIds.includes(e.code))
    )

    const vacuumRangeActive = computed(
      () =>
        !!selectedFacets.value.filter((e) => vacuumRangeIds.includes(e.key))
          .length
    )

    const suctionSpeedActive = computed(
      () =>
        !!selectedFacets.value.filter((e) => suctionSpeedIds.includes(e.key))
          .length
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
    }

    return {
      isExtended,
      multiSelectFacets,
      shrinkedFacets,
      selectedFacets,
      vacuumRangeIds,
      vacuumRange,
      suctionSpeedIds,
      vacuumRangePresent,
      suctionSpeedPresent,
      vacuumRangeActive,
      suctionSpeedActive,
      suctionSpeed,
      updateFacets,
      removeFacet,
    }
  },
}
