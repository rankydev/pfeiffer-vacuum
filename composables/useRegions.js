import { useContext, ref, computed } from '@nuxtjs/composition-api'

const regions = ref([])

export const useRegions = (isocode) => {
  const { $hybrisApi } = useContext()

  async function getRegions() {
    if (isocode.value) {
      await Promise.resolve(
        $hybrisApi.countriesApi.getRegions(isocode.value)
      ).then((res) => {
        regions.value = res
      })
    } else {
      regions.value = []
    }
  }
  return { getRegions, regions }
}
