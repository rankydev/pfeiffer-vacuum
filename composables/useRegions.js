import { useContext, ref, computed } from '@nuxtjs/composition-api'

const regions = ref([])

export const useRegions = (data) => {
  const { $hybrisApi } = useContext()

  async function getRegions() {
    const iso = computed(() => data.value.contact?.address?.country?.isocode)
    if (iso.value) {
      await $hybrisApi.countriesApi.getRegions(iso.value).then((res) => {
        regions.value = res
      })
    } else {
      regions.value = []
    }
  }
  return { getRegions, regions }
}
