import { getCountriesApi } from '~/plugins/hybris/countriesApi/countriesApi'
import config from '../hybris.config'

const ctx = {
  $logger: {
    error: jest.fn((a, b) => {
      return a
    }),
  },
}

describe('countriesApi', () => {
  describe('countries', () => {
    it('should return countries when hybris call is successful', () => {
      const axiosInstance = {
        $get: jest.fn(() => {
          return {
            error: false,
            countries: ['Land1'],
          }
        }),
      }
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      countriesApi.getCountries()

      expect(axiosInstance.$get).toBeCalledWith(config.COUNTRIES_API, {})
      countriesApi.getCountries().then(function (result) {
        expect(result).toStrictEqual(['Land1'])
      })
    })
    it('should throw error when hybris returns no countries', () => {
      const axiosInstance = {
        $get: jest.fn(() => {
          return {
            error: true,
          }
        }),
      }
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      countriesApi.getCountries()

      expect(axiosInstance.$get).toBeCalledWith(config.COUNTRIES_API, {})
      countriesApi.getCountries().then(function (result) {
        expect(result).toStrictEqual([])
      })
    })
  })
  describe('regions', () => {
    it('should return regions when hybris call is successful', () => {
      const axiosInstance = {
        $get: jest.fn(() => {
          return {
            error: false,
            regions: ['Region1'],
          }
        }),
      }
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      countriesApi.getRegions('US').then(function (result) {
        expect(result).toStrictEqual(['Region1'])
      })
    })
    it('should throw error when hybris returns no countries', () => {
      const axiosInstance = {
        $get: jest.fn(() => {
          return {
            error: true,
            regions: ['Region1'],
          }
        }),
      }
      const countriesApi = getCountriesApi(axiosInstance, ctx)
      countriesApi.getRegions('US').then(function (result) {
        expect(result).toStrictEqual([])
      })
    })
  })
})
