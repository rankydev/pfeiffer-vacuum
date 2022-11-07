// Facet id's for vacuum range and suction speed
import { computed } from '@nuxtjs/composition-api'

export const vacuumRangeIds = ['3913', '3912']
export const suctionSpeedIds = ['3983', '3982']

// Unit for suction speed, which will be set by frontend
export const suctionSpeedUnit = 'm<sup>3</sup>/h'
export const vacuumRangeUnit = ' mbar'

export const useRangeSliderHandling = (
  currentQuery = {},
  facets = [],
  selectedFacets
) => {
  const vacuumRange = computed(() => {
    let lower = currentQuery.value?.query?.filterTerms?.find(
      (e) => e.key === vacuumRangeIds[0]
    )
    let upper = currentQuery.value?.query?.filterTerms?.find(
      (e) => e.key === vacuumRangeIds[1]
    )

    const reg = new RegExp(`(<|>)=|${vacuumRangeUnit}|\\s`, 'g')

    lower = lower?.value?.replace(reg, '')
    upper = upper?.value?.replace(reg, '')

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

  const isVacuumRangePresent = computed(
    () => !!facets.value?.filter((e) => vacuumRangeIds.includes(e.code))
  )

  const isSuctionSpeedPresent = computed(
    () => !!facets.value?.filter((e) => suctionSpeedIds.includes(e.code))
  )

  const isVacuumRangeActive = computed(
    () =>
      !!selectedFacets.value.filter((e) => vacuumRangeIds.includes(e.key))
        .length
  )

  const isSuctionSpeedActive = computed(
    () =>
      !!selectedFacets.value.filter((e) => suctionSpeedIds.includes(e.key))
        .length
  )

  return {
    vacuumRange,
    suctionSpeed,
    isVacuumRangePresent,
    isSuctionSpeedPresent,
    isVacuumRangeActive,
    isSuctionSpeedActive,
  }
}

export default {}
