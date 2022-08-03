import { getCountriesApi } from '~/plugins/hybris/countriesApi/countriesApi'
import config from '../hybris.config'

const mockCountries = ['Land1']
const mockRegions = ['Region1']
const mockError = 'fehler'

function createInstance(
  hasCountries,
  hasRegions,
  hasError,
  hasErrorMessage = false
) {
  const ctx = {
    $logger: {
      error: jest.fn(),
    },
  }

  const mockGet = jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (hasError) {
        reject(hasErrorMessage ? mockError : '')
      } else {
        resolve({
          countries: hasCountries ? mockCountries : undefined,
          regions: hasRegions ? mockRegions : undefined,
        })
      }
    })
  })

  const axiosInstance = {
    $get: mockGet,
  }
  return { ctx, axiosInstance }
}

describe('countriesApi', () => {
  describe('countries', () => {
    it('should return countries when hybris call is successful', () => {
      const { ctx, axiosInstance } = createInstance(true, false, null)
      const countriesApi = getCountriesApi(axiosInstance, ctx)

      const result = countriesApi.getCountries()
      expect(axiosInstance.$get).toBeCalledWith(config.COUNTRIES_API, {})
      result.then(function (r) {
        expect(r).toStrictEqual(['Land1'])
      })
    })
    it('should throw error when hybris returns no countries', async () => {
      const { ctx, axiosInstance } = createInstance(false, false, true, true)
      const countriesApi = getCountriesApi(axiosInstance, ctx)

      await countriesApi.getCountries().then(function (result) {
        expect(result).toStrictEqual([])
      })
      expect(axiosInstance.$get).toBeCalledWith(config.COUNTRIES_API, {})
      expect(ctx.$logger.error).toBeCalledWith(
        'Error when fetching countries. Returning empty array.',
        mockError
      )
    })
    it('should log empty string when no error is present', async () => {
      const { ctx, axiosInstance } = createInstance(false, false, true)
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      await countriesApi.getCountries()
      expect(ctx.$logger.error).toBeCalledWith(
        'Error when fetching countries. Returning empty array.',
        ''
      )
    })
  })
  describe('regions', () => {
    it('should return regions when hybris call is successful', () => {
      const { ctx, axiosInstance } = createInstance(false, true, false)
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      countriesApi.getRegions('US').then(function (r) {
        expect(r).toStrictEqual(['Region1'])
      })
    })
    it('should throw error when hybris returns no regions', async () => {
      const { ctx, axiosInstance } = createInstance(false, false, true, true)
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      await countriesApi.getRegions('US').then(function (result) {
        expect(result).toStrictEqual([])
      })
      expect(ctx.$logger.error).toBeCalledWith(
        'Error when fetching regions. Returning empty array.',
        mockError
      )
    })
    it('should log empty string when no error is present', async () => {
      const { ctx, axiosInstance } = createInstance(false, false, true)
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      await countriesApi.getRegions()
      expect(ctx.$logger.error).toBeCalledWith(
        'Error when fetching regions. Returning empty array.',
        ''
      )
    })
  })
})
