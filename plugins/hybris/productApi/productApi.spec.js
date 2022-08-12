import { getProductApi } from './productApi'
import { jest } from '@jest/globals'
import { fail } from 'yargs'

const axiosInstance = (value) => ({
  $get: jest.fn((url, params) => {
    return {
      catch: () => {
        return { products: value ? value : [params.params.codes] }
      },
    }
  }),
})

describe('productApi', () => {
  describe('initial state', () => {
    test('should fetch products with product ids', () => {
      const ctx = {
        $getLoggerFor: () => ({
          error: jest.fn(),
        }),
      }

      const productApi = getProductApi(axiosInstance(), ctx)
      const idArray = ['test', 'test2', 'test3']

      productApi
        .getProducts(idArray)
        .then((data) => {
          expect(data).toStrictEqual([idArray.join()])
        })
        .catch((e) => {
          throw new Error(e)
        })
    })

    test('should trigger logger when ids are not an array', () => {
      const loggerError = jest.fn()
      const ctx = {
        $getLoggerFor: () => ({
          error: loggerError,
        }),
      }

      const productApi = getProductApi(axiosInstance(), ctx)
      const idArray = 'not an array'

      productApi.getProducts(idArray)

      expect(loggerError).toBeCalledTimes(1)
    })

    test('should return empty array when products array is not given by API', () => {
      const loggerError = jest.fn()
      const ctx = {
        $getLoggerFor: () => ({
          error: loggerError,
        }),
      }

      const productApi = getProductApi(axiosInstance('not an array'), ctx)
      const idArray = ['test', 'test2', 'test3']

      productApi.getProducts(idArray).then((data) => {
        expect(data).toStrictEqual([])
      })
    })
  })
})
