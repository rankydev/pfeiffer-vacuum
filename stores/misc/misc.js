import { useContext } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'

export const useMiscStore = defineStore('misc', {
  state: () => ({
    countries: [],
  }),
  actions: {
    async loadCountries() {
      const { $hybrisApi } = useContext()
      await Promise.resolve($hybrisApi.countriesApi.getCountries()).then(
        (res) => {
          this.countries = res
        }
      )
    },
  },
  /*
  const countries = ref([])
  const { $hybrisApi } = useContext()

  useAsync(async () => {
    // Fetched hybris countries
    await Promise.resolve($hybrisApi.countriesApi.getCountries()).then(
      (res) => {
        countries.value = res
        console.log(countries.value)
      }
    )
  }, 'getCountries')

  console.log(countries)
  return { countries }
   */
})
