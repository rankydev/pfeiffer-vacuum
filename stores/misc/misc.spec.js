import { useMiscStore } from '~/stores/misc'
import { setActivePinia, createPinia } from 'pinia'

let mockCountries = ['Land1']

jest.mock('@nuxtjs/composition-api', () => {
  return {
    useContext: jest.fn(() => {
      return {
        $hybrisApi: {
          countriesApi: {
            getCountries: jest.fn(() => {
              return mockCountries
            }),
          },
        },
      }
    }),
  }
})

describe('useMiscStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  test('should return initally all countries', async () => {
    const countriesStore = await useMiscStore()
    const storeCountries = countriesStore.countries

    expect(storeCountries).toStrictEqual(mockCountries)
  })
  test('should return inital country list after second initialization of store', async () => {
    const initialCountries = mockCountries
    await useMiscStore()
    mockCountries = ['Land2']
    const countriesStore = await useMiscStore()
    const storeCountries = countriesStore.countries
    mockCountries = initialCountries

    expect(storeCountries).toStrictEqual(initialCountries)
  })
})
