import { useContext } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'

export const useMiscStore = () => {
  const storeCreator = defineStore('misc', {
    state: () => ({
      countries: [],
    }),
    actions: {
      async loadCountries() {
        const { $hybrisApi } = useContext()
        this.countries = await $hybrisApi.countriesApi.getCountries()
      },
    },
  })
  const innerStore = storeCreator()
  if (innerStore.countries.length === 0) {
    innerStore.loadCountries()
  }
  return innerStore
}
