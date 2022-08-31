import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

export const useMiscStore = defineStore('misc', () => {
  const { $hybrisApi } = $nuxt
  const countries = ref([])

  const loadCountries = async () => {
    countries.value = await $hybrisApi.countriesApi.getCountries()
  }

  // the initial store initialization
  if (countries.value.length === 0) {
    loadCountries()
  }

  return { countries, loadCountries }
})
