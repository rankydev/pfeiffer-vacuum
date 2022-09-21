import { ref } from '@nuxtjs/composition-api'
import { useHybrisApiStore } from '~/stores/hybrisApi'

export const useRegions = (isocode) => {
  const hybrisApiStore = useHybrisApiStore()

  const regions = ref([])

  async function loadRegions() {
    regions.value = isocode.value
      ? await hybrisApiStore?.countriesApi?.getRegions(isocode.value)
      : []
  }
  return { loadRegions, regions }
}
