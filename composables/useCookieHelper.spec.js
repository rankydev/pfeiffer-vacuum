import { getCookie, setCookie, removeCookie } from './cookieHelper'
import { beforeEach, describe } from '@jest/globals'

const cookieKey = 'dummyKey'
const defaultCookie = 'defaultCookie'
const mockDebug = jest.fn()
const mockTrace = jest.fn()
const mockWarn = jest.fn()
const mockSetCookie = jest.fn()
const mockSerialize = jest.fn()
const mockRemoveCookie = jest.fn()

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

jest.mock('~/utils/getLoggerFor', () => {
  return jest.fn(() => ({
    debug: () => mockDebug(),
    trace: () => mockTrace(),
    warn: () => mockWarn(),
  }))
})

beforeEach(() => {
  window.process.client = true
  jest.clearAllMocks()
})

describe('cookieHelper', () => {
  describe('during interaction', () => {
    describe('getCookie', () => {
      test('should return cookie given client environment', () => {
        const context = {
          req: {},
        }
        const cookie = getCookie(context, cookieKey)

        expect(cookie).toBe(cookieKey)
      })

      test('should return default cookie given client environment', () => {
        const context = {
          req: {},
        }
        const defaultCookie = 'lorem ipsum'
        const cookie = getCookie(context, undefined, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })

      test('should return default cookie given undefined request', () => {
        window.process.client = false

        const context = {
          req: undefined,
        }
        const defaultCookie = 'lorem ipsum'
        const cookie = getCookie(context, undefined, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })

      test('should get cookie given client = false', () => {
        window.process.client = false

        const context = {
          req: {
            headers: {
              cookie: cookieKey,
            },
          },
        }
        const cookie = getCookie(context, cookieKey)

        expect(cookie).toBe(cookieKey)
      })

      test('should return default value given cookieKey = null', () => {
        window.process.client = false
        const context = {
          req: {
            headers: {
              cookie: cookieKey,
            },
          },
        }
        const cookie = getCookie(context, null, defaultCookie)

        expect(cookie).toBe(defaultCookie)
      })
    })

    describe('setCookie', () => {
      test('should not set cookie given undefined cookie value', () => {
        setCookie({ res: {} }, cookieKey, undefined)

        expect(mockDebug).toBeCalledTimes(2)
      })

      test('should set cookie given cookie value', () => {
        setCookie({ res: {} }, cookieKey, cookieKey)

        expect(mockTrace).toBeCalledTimes(1)
        expect(mockSetCookie).toBeCalledTimes(1)
      })

      test('should set cookie given no client environment', async () => {
        window.process.client = false

        const mockSetHeader = jest.fn()

        await setCookie(
          {
            res: {
              getHeader: jest.fn((val) => val),
              setHeader: mockSetHeader,
            },
          },
          cookieKey,
          cookieKey
        )

        expect(mockSerialize).toBeCalledTimes(1)
        expect(mockSetHeader).toBeCalledTimes(1)
        expect(mockSetHeader).toBeCalledWith('Set-Cookie', expect.anything())
      })

      test('should take fallback array given no header', async () => {
        window.process.client = false

        const mockSetHeader = jest.fn()

        await setCookie(
          {
            res: {
              getHeader: jest.fn(() => undefined),
              setHeader: mockSetHeader,
            },
          },
          cookieKey,
          cookieKey
        )

        expect(mockSetHeader).toBeCalledWith('Set-Cookie', [undefined])
      })

      test('should not set header given empty res', async () => {
        window.process.client = false

        await setCookie(
          {
            res: undefined,
          },
          cookieKey,
          cookieKey
        )
      })
    })

    describe('removeCookie', () => {
      test('should remove cookie given context and cookie key', () => {
        removeCookie({ res: {} }, cookieKey)

        expect(mockDebug).toBeCalledTimes(1)
        expect(mockRemoveCookie).toBeCalledTimes(1)
        expect(mockRemoveCookie).toBeCalledWith(cookieKey, expect.anything())
      })

      test('should remove cookie given context and cookie key with no client environment', () => {
        window.process.client = false

        const getMock = jest.fn((val) => val)
        const setMock = jest.fn((val) => val)

        removeCookie(
          {
            res: {
              getHeader: getMock,
              setHeader: setMock,
            },
          },
          cookieKey
        )

        expect(mockDebug).toBeCalledTimes(1)
        expect(mockSerialize).toBeCalledTimes(1)
        expect(getMock).toBeCalledWith('Set-Cookie')
        expect(setMock).toBeCalledWith('Set-Cookie', expect.anything())
      })

      test('should throw logger warning when try catch fails', () => {
        window.process.client = false

        removeCookie(
          {
            res: {
              getHeader: jest.fn(),
            },
          },
          cookieKey
        )
      })
    })
  })
})
