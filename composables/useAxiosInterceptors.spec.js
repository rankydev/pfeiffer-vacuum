import { beforeEach, describe, expect } from '@jest/globals'
import { useAxiosInterceptors } from './useAxiosInterceptors'

const mockTrace = jest.fn()
const mockDebug = jest.fn()
const mockError = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        trace: mockTrace,
        debug: mockDebug,
        error: mockError,
      },
    }
  },
}))

const mockStringify = jest.fn()
jest.mock('qs', () => ({
  stringify: (params, config) => mockStringify(params, config),
}))

const mockLoggedIn = jest.fn()
const mockAuth = jest.fn()

jest.mock('~/stores/user', () => ({
  useUserStore: () => {
    return {
      loggedIn: mockLoggedIn(),
      auth: mockAuth(),
    }
  },
}))

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      i18n: {
        locale: 'testLocale',
      },
    }),
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('axiosInterceptors', () => {
  describe('onFulfilledRequestHandler', () => {
    describe('authHeader', () => {
      test('should return full config given empty config while user is not logged in', () => {
        mockLoggedIn.mockReturnValue(false)
        const { fulfilledRequest } = useAxiosInterceptors()

        fulfilledRequest({})
        expect(mockDebug).toBeCalledWith('addAuthHeader', false)
        expect(mockTrace).toBeCalledWith('Headers: ', undefined)
      })

      test('should return full config given empty config while user is logged in', () => {
        mockLoggedIn.mockReturnValue(true)
        mockAuth.mockReturnValue({
          token_type: 'Bearer',
          access_token: 'test_token',
        })
        const { fulfilledRequest } = useAxiosInterceptors()

        fulfilledRequest({ headers: {} })
        expect(mockDebug).toBeCalledWith('addAuthHeader', true)
        expect(mockTrace).toBeCalledWith('AuthObject: ', {
          token_type: 'Bearer',
          access_token: 'test_token',
        })
        expect(mockTrace).toBeCalledWith('Authorization Header Set')
        expect(mockTrace).toBeCalledWith('Headers: ', {
          Authorization: 'Bearer test_token',
        })
      })
    })
    describe('i18nParameters', () => {
      test('should set language given empty config', () => {
        const { fulfilledRequest } = useAxiosInterceptors()

        const config = fulfilledRequest({ headers: {} })
        expect(config.params.lang).toBe('testLocale')
      })

      test('should not set language given config with language', () => {
        const { fulfilledRequest } = useAxiosInterceptors()

        const config = fulfilledRequest({
          headers: {},
          params: { lang: 'presetLanguage' },
        })
        expect(config.params.lang).toBe('presetLanguage')
      })
    })
    describe('paramsSerializer', () => {
      test('should return call stringify function given params', () => {
        const { fulfilledRequest } = useAxiosInterceptors()

        const config = fulfilledRequest({ headers: {} })
        config.paramsSerializer({ anyParam: 'anyValue' })
        expect(mockStringify).toBeCalledWith(
          { anyParam: 'anyValue' },
          { arrayFormat: 'brackets' }
        )
      })
    })
  })
  describe('onRejectedRequestHandler', () => {
    test('should log error and return error as promise', () => {
      const { rejectedRequest } = useAxiosInterceptors()

      const errorPromise = rejectedRequest({ config: 'test' })
      expect(mockError).toBeCalledWith(
        'Auth error:',
        { config: 'test' },
        'test'
      )
      errorPromise.then((err) => {
        expect(err).toStrictEqual({ config: 'test' })
      })
    })
    test('should log empty error and return empty error as promise', () => {
      const { rejectedRequest } = useAxiosInterceptors()

      const errorPromise = rejectedRequest({})
      expect(mockError).toBeCalledWith('Auth error:', {}, null)
      errorPromise.then((err) => {
        expect(err).toStrictEqual({})
      })
    })
  })
  describe('onFulfilledResponseHandler', () => {
    test('should log response and return response', () => {
      const { fulfilledResponse } = useAxiosInterceptors()

      const response = {
        status: 200,
        config: { url: 'www.example.com' },
        data: 'test data',
      }
      expect(fulfilledResponse(response)).toBe(response)
      expect(mockTrace).toBeCalledWith('Shop Response', 200, 'www.example.com')
      expect(mockTrace).toBeCalledWith({ url: 'www.example.com' })
      expect(mockTrace).toBeCalledWith('test data')
    })
  })
  describe('onRejectedResponseHandler', () => {
    test('should log error and return error as promise', () => {
      const { rejectedResponse } = useAxiosInterceptors()

      const errorPromise = rejectedResponse({
        config: { test: 'test' },
        response: {
          status: 404,
          data: {
            errors: [{ requestId: '123', stackTrace: 'something went wrong' }],
          },
        },
      })

      expect(mockError).toBeCalledWith(
        'Error during shop request',
        '[123]',
        'HTTP Status 404',
        { test: 'test' }
      )
      expect(mockError).toBeCalledWith('something went wrong')
      errorPromise.then((response) => {
        expect(response).toStrictEqual({
          status: 404,
          data: {
            errors: [{ requestId: '123', stackTrace: 'something went wrong' }],
          },
        })
      })
    })

    test('should log empty error and return empty error as promise', () => {
      const { rejectedResponse } = useAxiosInterceptors()

      const errorPromise = rejectedResponse({
        response: {},
      })

      errorPromise.then((response) => {
        expect(response).toStrictEqual({})
      })
    })
  })
})
