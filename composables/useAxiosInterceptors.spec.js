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

const mockIsLoggedIn = jest.fn()
const mockAuth = jest.fn()
const mockAuthorizationFromCookie = jest.fn()

jest.mock('~/stores/user', () => ({
  useUserStore: () => {
    return {
      isLoggedIn: mockIsLoggedIn(),
      auth: mockAuth(),
      authorizationFromCookie: mockAuthorizationFromCookie(),
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

jest.mock('~/composables/useCookieHelper', () => ({
  useCookieHelper: () => {
    return {
      getCookie: jest.fn((input) => {
        if (input === 'auth.tokenType') {
          return 'Bearer'
        } else if (input === 'auth.accessToken') {
          return 'test_token'
        }
      }),
    }
  },
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('axiosInterceptors', () => {
  describe('onFulfilledRequestHandler', () => {
    describe('authHeader', () => {
      test('should return full config given empty config while user is not logged in', () => {
        mockIsLoggedIn.mockReturnValue(false)
        const { fulfilledRequest } = useAxiosInterceptors()

        fulfilledRequest({})
        expect(mockDebug).toBeCalledWith('addAuthHeader', false)
        expect(mockTrace).toBeCalledWith('Headers: ', undefined)
      })

      test('should return full config given empty config while user is logged in', () => {
        mockIsLoggedIn.mockReturnValue(true)
        mockAuthorizationFromCookie.mockReturnValue(() => 'Bearer test_token')
        const { fulfilledRequest } = useAxiosInterceptors()

        fulfilledRequest({ headers: {} })
        expect(mockDebug).toBeCalledWith('addAuthHeader', true)
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
      errorPromise.catch((err) => {
        expect(err).toStrictEqual({ config: 'test' })
      })
    })
    test('should log empty error and return empty error as promise', () => {
      const { rejectedRequest } = useAxiosInterceptors()

      const errorPromise = rejectedRequest({})
      expect(mockError).toBeCalledWith('Auth error:', {}, null)
      errorPromise.catch((err) => {
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
})
