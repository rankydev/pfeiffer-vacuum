import { ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'

export const useMiscStore = defineStore('misc', () => {
  const countries = ref([])
  const { $hybrisApi } = useContext()

  useAsync(async () => {
    // Fetched hybris countries
    await $hybrisApi.countriesApi.getCountries().then((res) => {
      countries.value = res
    })
  }, 'getCountries')

  return { countries }
})
