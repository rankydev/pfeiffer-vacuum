import { useMiscStore } from '~/stores/misc'
import { setActivePinia, createPinia } from 'pinia'

const countries = ['Land1']

jest.mock('@nuxtjs/composition-api', () => {
  return {
    useContext: jest.fn(() => {
      return {
        $hybrisApi: {
          countriesApi: {
            getCountries: jest.fn(() => {
              return countries
            }),
          },
        },
      }
    }),
  }
})

describe('useMiscStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  test('should return all countries', async () => {
    const countriesStore = await useMiscStore()
    const storeCountries = countriesStore.countries

    expect(storeCountries).toStrictEqual(countries)
  })
})
