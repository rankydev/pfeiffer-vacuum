import { beforeEach, describe, expect } from '@jest/globals'

const mockSetBaseUrl = jest.fn()
const mockSetHeader = jest.fn()
const mockUseRequestInterceptor = jest.fn()
const mockUseResponeInterceptor = jest.fn()
const mockAxios = jest.fn().mockReturnValue({
  setBaseURL: mockSetBaseUrl,
  setHeader: mockSetHeader,
  interceptors: {
    request: {
      use: mockUseRequestInterceptor,
    },
    response: {
      use: mockUseResponeInterceptor,
    },
  },
})

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      $axios: {
        create: () => mockAxios(),
      },
    }),
  }
})

jest.mock('./useAxiosInterceptors', () => {
  return {
    useAxiosInterceptors: () => ({
      fulfilledRequest: 'fulfilledRequest',
      rejectedRequest: 'rejectedRequest',
      fulfilledResponse: 'fulfilledResponse',
      rejectedResponse: 'rejectedResponse',
    }),
  }
})

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

describe('axiosForHybris', () => {
  describe('during interaction', () => {
    test('should return axios instance with proper configuration', () => {
      process.env.SHOP_BASE_URL = 'test'
      const { useAxiosForHybris } = require('./useAxiosForHybris')
      const { axios } = useAxiosForHybris()

      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(mockSetBaseUrl).toBeCalledWith('test')
      expect(mockSetHeader).toBeCalledWith('Content-Type', 'application/json')
      expect(mockUseRequestInterceptor).toBeCalledWith(
        'fulfilledRequest',
        'rejectedRequest'
      )
      expect(mockUseResponeInterceptor).toBeCalledWith(
        'fulfilledResponse',
        'rejectedResponse'
      )
    })

    test('should return axios instance that was already created', () => {
      const { useAxiosForHybris } = require('./useAxiosForHybris')
      const { axios } = useAxiosForHybris()
      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)

      const { axios: anotherAxios } = useAxiosForHybris()
      expect(anotherAxios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(axios).toStrictEqual(anotherAxios)
    })
  })
})
