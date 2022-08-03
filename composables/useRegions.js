import { useContext, ref } from '@nuxtjs/composition-api'

const regions = ref([])

export const useRegions = (isocode) => {
  const { $hybrisApi } = useContext()

  async function loadRegions() {
    if (isocode.value) {
      regions.value = await $hybrisApi.countriesApi.getRegions(isocode.value)
    } else {
      regions.value = []
    }
  }
  return { loadRegions, regions }
}
