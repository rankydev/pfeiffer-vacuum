import { useCookieHelper } from './useCookieHelper'

const cookieKey = 'dummyKey'
const defaultCookie = 'defaultCookie'
const mockDebug = jest.fn()
const mockTrace = jest.fn()
const mockWarn = jest.fn()
const mockSetCookie = jest.fn()
const mockSerialize = jest.fn()
const mockRemoveCookie = jest.fn()
const mockRes = jest.fn()
const mockReq = jest.fn()

jest.mock('cookie', () => ({
  parse: jest.fn((val) => {
    const cookieObj = {}
    cookieObj[val] = val
    return cookieObj
  }),
  serialize: () => mockSerialize(),
}))

jest.mock('js-cookie', () => ({
  get: jest.fn((val) => val),
  set: () => mockSetCookie(),
  remove: (key, options) => mockRemoveCookie(key, options),
}))

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        debug: () => mockDebug(),
        trace: () => mockTrace(),
        warn: () => mockWarn(),
      },
    }
  },
}))

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      req: mockReq(),
      res: mockRes(),
    }),
  }
})

beforeEach(() => {
  window.process.client = true
  jest.clearAllMocks()
})

describe('cookieHelper', () => {
  describe('during interaction', () => {
    describe('getCookie', () => {
      test('should return cookie given client environment', () => {
        mockReq.mockReturnValueOnce({})

        const { getCookie } = useCookieHelper()

        const cookie = getCookie(cookieKey)

        expect(cookie).toBe(cookieKey)
      })

      test('should return default cookie given client environment', () => {
        mockReq.mockReturnValueOnce({})

        const { getCookie } = useCookieHelper()

        const defaultCookie = 'lorem ipsum'
        const cookie = getCookie(undefined, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })

      test('should return default cookie given undefined request', () => {
        mockReq.mockReturnValueOnce({})

        const { getCookie } = useCookieHelper()
        window.process.client = false

        const defaultCookie = 'lorem ipsum'
        const cookie = getCookie(undefined, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })

      test('should get cookie given client = false', () => {
        mockReq.mockReturnValueOnce({
          headers: {
            cookie: cookieKey,
          },
        })

        const { getCookie } = useCookieHelper()
        window.process.client = false

        const cookie = getCookie(cookieKey)

        expect(cookie).toBe(cookieKey)
      })

      test('should return default value given cookieKey = null', () => {
        mockReq.mockReturnValueOnce({
          headers: {
            cookie: cookieKey,
          },
        })

        const { getCookie } = useCookieHelper()
        window.process.client = false

        const cookie = getCookie(null, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })
    })

    describe('setCookie', () => {
      test('should not set cookie given undefined cookie value', () => {
        mockRes.mockReturnValueOnce({})
        const { setCookie } = useCookieHelper()

        setCookie(cookieKey, undefined)

        expect(mockDebug).toBeCalledTimes(2)
      })

      test('should set cookie given cookie value', () => {
        mockRes.mockReturnValueOnce({})
        const { setCookie } = useCookieHelper()

        setCookie(cookieKey, cookieKey)

        expect(mockTrace).toBeCalledTimes(1)
        expect(mockSetCookie).toBeCalledTimes(1)
      })

      test('should set cookie given no client environment', async () => {
        const mockSetHeader = jest.fn()
        mockRes.mockReturnValueOnce({
          getHeader: jest.fn((val) => val),
          setHeader: mockSetHeader,
        })

        const { setCookie } = useCookieHelper()
        window.process.client = false

        await setCookie(cookieKey, cookieKey)

        expect(mockSerialize).toBeCalledTimes(1)
        expect(mockSetHeader).toBeCalledTimes(1)
        expect(mockSetHeader).toBeCalledWith('Set-Cookie', expect.anything())
      })

      test('should take fallback array given no header', async () => {
        const mockSetHeader = jest.fn()
        mockRes.mockReturnValueOnce({
          getHeader: jest.fn(() => undefined),
          setHeader: mockSetHeader,
        })

        const { setCookie } = useCookieHelper()
        window.process.client = false

        await setCookie(cookieKey, cookieKey)

        expect(mockSetHeader).toBeCalledWith('Set-Cookie', [undefined])
      })

      test('should not set header given empty res', async () => {
        mockRes.mockReturnValueOnce(undefined)

        const { setCookie } = useCookieHelper()
        window.process.client = false

        await setCookie(cookieKey, cookieKey)
      })
    })

    describe('removeCookie', () => {
      test('should remove cookie given context and cookie key', () => {
        mockRes.mockReturnValueOnce({})

        const { removeCookie } = useCookieHelper()

        removeCookie(cookieKey)

        expect(mockDebug).toBeCalledTimes(1)
        expect(mockRemoveCookie).toBeCalledTimes(1)
        expect(mockRemoveCookie).toBeCalledWith(cookieKey, expect.anything())
      })

      test('should remove cookie given context and cookie key with no client environment', () => {
        const getMock = jest.fn((val) => val)
        const setMock = jest.fn((val) => val)
        mockRes.mockReturnValueOnce({ getHeader: getMock, setHeader: setMock })

        const { removeCookie } = useCookieHelper()
        window.process.client = false

        removeCookie(cookieKey)

        expect(mockDebug).toBeCalledTimes(1)
        expect(mockSerialize).toBeCalledTimes(1)
        expect(getMock).toBeCalledWith('Set-Cookie')
        expect(setMock).toBeCalledWith('Set-Cookie', expect.anything())
      })

      test('should throw logger warning when try catch fails', () => {
        mockRes.mockReturnValueOnce({ getHeader: jest.fn() })

        const { removeCookie } = useCookieHelper()
        window.process.client = false

        removeCookie(cookieKey)
      })
    })
  })
})
