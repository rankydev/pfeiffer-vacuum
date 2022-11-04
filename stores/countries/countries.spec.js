import { useCountriesStore } from '~/stores/countries'
import { setActivePinia, createPinia } from 'pinia'

const mockCountries = ['Land1']
const mockGet = jest.fn()

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return { axios: { $get: mockGet } }
  },
}))

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule
  return {
    ...originalModule,
    onBeforeMount: (callback) => callback(),
    onServerPrefetch: jest.fn(),
    ssrRef: ref,
    useContext: () => {
      return { i18n: {} }
    },
  }
})

const mockTrace = jest.fn()
const mockDebug = jest.fn()
const mockInfo = jest.fn()
const mockError = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        trace: mockTrace,
        debug: mockDebug,
        info: mockInfo,
        error: mockError,
      },
    }
  },
}))

describe('useCountriesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.resetAllMocks()
  })
  describe('loadCountries', () => {
    test('should initally load all countries', async () => {
      mockGet.mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))

      const countriesStore = useCountriesStore()

      await new Promise(process.nextTick)

      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(mockGet).toBeCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/countries',
        {}
      )
      expect(countriesStore.countries).toStrictEqual(mockCountries)
    })
    test('should return inital country list after second initialization of store', async () => {
      mockGet.mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))

      const store1 = useCountriesStore()

      await new Promise(process.nextTick)

      const store2 = useCountriesStore()

      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(store1.countries).toBe(store2.countries)
    })
    test('should log error when loading countries failed', async () => {
      mockGet.mockReturnValue(Promise.reject('something went wrong'))
      const countriesStore = await useCountriesStore()

      await new Promise(process.nextTick)

      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(countriesStore.countries).toStrictEqual([])
      expect(mockError).toBeCalledWith(
        'Error when fetching countries. Returning empty array.',
        'something went wrong'
      )
    })
  })
  describe('loadRegions', () => {
    test('should load regions given valid isocode', async () => {
      const regions = ['Region1', 'Region2']
      mockGet
        .mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))
        .mockReturnValueOnce(Promise.resolve({ regions }))
      const countriesStore = useCountriesStore()

      await countriesStore.loadRegions('US')

      expect(mockGet).toBeCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/countries/US/regions'
      )
      expect(countriesStore.regions).toStrictEqual({ US: regions })
    })

    test('should log info given no isocode', async () => {
      mockGet.mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))
      const countriesStore = useCountriesStore()

      await countriesStore.loadRegions()

      expect(mockInfo).toBeCalledWith("Can't load regions without isocode")
    })

    test('should not load regions that are already loaded', async () => {
      const regions = ['Region1', 'Region2']
      mockGet.mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))
      const countriesStore = useCountriesStore()

      countriesStore.regions = { US: regions }

      await countriesStore.loadRegions('US')

      expect(mockGet).toBeCalledTimes(1)
      expect(mockDebug).toBeCalledWith(
        'Regions for isocode US are already loaded, no need to load again',
        regions
      )
      expect(countriesStore.regions).toStrictEqual({ US: regions })
    })

    test('should log error when loading regions failed', async () => {
      mockGet
        .mockReturnValueOnce(Promise.resolve({ countries: mockCountries }))
        .mockReturnValueOnce(Promise.reject('something went wrong'))
      const countriesStore = await useCountriesStore()

      await countriesStore.loadRegions('US')

      expect(mockGet).toHaveBeenCalledTimes(2)
      expect(mockError).toBeCalledWith(
        'Error when fetching regions. Returning empty array.',
        'something went wrong'
      )
      expect(countriesStore.regions).toStrictEqual({ US: [] })
    })
  })
})
