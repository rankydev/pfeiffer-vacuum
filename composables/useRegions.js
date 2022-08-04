import { useContext, ref } from '@nuxtjs/composition-api'

const regions = ref([])

export const useRegions = (isocode) => {
  const { $hybrisApi } = useContext()

  async function loadRegions() {
    regions.value = isocode.value
      ? await $hybrisApi?.countriesApi?.getRegions(isocode.value)
      : []
  }
  return { loadRegions, regions }
}
