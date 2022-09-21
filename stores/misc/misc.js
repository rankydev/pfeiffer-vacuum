import { defineStore } from 'pinia'
import createNuxtStore from '../createNuxtStore'
import { ref } from '@nuxtjs/composition-api'
import { useHybrisApiStore } from '~/stores/hybrisApi'

export const useMiscStore = createNuxtStore((ctx) =>
  defineStore('misc', () => {
    const hybrisApiStore = useHybrisApiStore(ctx)
    const countries = ref([])

    const loadCountries = async () => {
      countries.value = await hybrisApiStore.countriesApi.getCountries()
    }

    // the initial store initialization
    if (countries.value?.length === 0) {
      loadCountries()
    }

    const loadRegions = async (isocode) => {
      return isocode.value
        ? await hybrisApiStore?.countriesApi?.getRegions(isocode.value)
        : []
    }

    return { countries, loadCountries, loadRegions }
  })
)
