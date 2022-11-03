import { unref } from '@nuxtjs/composition-api'
import { suctionSpeedIds, vacuumRangeIds } from './useRangeSliderHandling'

export const useFacetActions = (selectedFacets, emit) => {
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

  // Removes clicked
  const removeFacet = (facet) => {
    emit(
      'updateFacets',
      unref(selectedFacets).filter((e) => e !== facet)
    )
  }

  return { updateFacets, removeFacet }
}
