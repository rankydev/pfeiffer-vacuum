import { useCountriesStore } from '~/stores/countries'
import { setActivePinia, createPinia } from 'pinia'

const mockCountries = ['Land1']
const mockGet = jest.fn()

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return { axios: { $get: mockGet } }
  },
}))

describe('useCountriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.resetAllMocks()
    mockGet
      .mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))
      .mockReturnValueOnce(Promise.resolve({ countries: ['Land2'] }))
  })

  test('should return initally all countries', async () => {
    const countriesStore = await useCountriesStore()

    await new Promise(process.nextTick)

    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(countriesStore.countries).toStrictEqual(mockCountries)
  })
  test('should return inital country list after second initialization of store', async () => {
    await useCountriesStore()
    const countriesStore = await useCountriesStore()

    await new Promise(process.nextTick)

    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(countriesStore.countries).toStrictEqual(mockCountries)
  })
})
