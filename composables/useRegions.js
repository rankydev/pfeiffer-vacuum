import { useContext, ref } from '@nuxtjs/composition-api'

const regions = ref([])

export const useRegions = (isocode) => {
  const { $hybrisApi } = useContext()

  async function loadRegions() {
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
  return { loadRegions, regions }
}
