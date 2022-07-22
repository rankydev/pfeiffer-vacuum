import { getProductApi } from './productApi'
import { jest } from '@jest/globals'

describe('productApi', () => {
  describe('initial state', () => {
    test('should fetch products with product ids', () => {
      const ctx = {
        $logger: {
          error: jest.fn(),
        },
      }
      const axiosInstance = {
        $get: jest.fn((url, params) => {
          return {
            products: [params.params.codes],
          }
        }),
      }
      const productApi = getProductApi(axiosInstance, ctx)
      const idArray = ['test', 'test2', 'test3']

      productApi
        .getProducts(idArray)
        .then((data) => {
          expect(data).toStrictEqual([idArray.join()])
        })
        .catch((e) => {
          console.log(e)
        })
    })

    test('should trigger logger when ids are not an array', () => {
      const loggerError = jest.fn()
      const ctx = {
        $logger: {
          error: loggerError,
        },
      }
      const axiosInstance = {
        $get: jest.fn((url, params) => {
          return {
            products: [params.params.codes],
          }
        }),
      }
      const productApi = getProductApi(axiosInstance, ctx)
      const idArray = 'not an array'

      productApi.getProducts(idArray)

      expect(loggerError).toBeCalledTimes(1)
    })

    test('should return empty array when products array is not given by API', () => {
      const loggerError = jest.fn()
      const ctx = {
        $logger: {
          error: loggerError,
        },
      }
      const axiosInstance = {
        $get: jest.fn((url, params) => {
          return {
            products: 'not an array',
          }
        }),
      }
      const productApi = getProductApi(axiosInstance, ctx)
      const idArray = ['test', 'test2', 'test3']

      productApi
        .getProducts(idArray)
        .then((data) => {
          expect(data).toStrictEqual([])
        })
        .catch((e) => {
          console.log(e)
        })
    })
  })
})
