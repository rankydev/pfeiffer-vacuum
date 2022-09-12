import preload from './preload'
import { createPinia, setActivePinia } from 'pinia'

const mockDebug = jest.fn()
const mockTrace = jest.fn()
const mockSetAuth = jest.fn()
const mockMergeAndLoadCarts = jest.fn()
const mockLoadCurrentUser = jest.fn()
const mockGuid = 'lorem-guid'

const mockLogger = jest.fn(() => ({
  debug: mockDebug,
  trace: mockTrace,
}))

let mockContext = { getLoggerFor: mockLogger }
let mockIsLoginProcess = false

jest.mock('~/stores/auth', () => ({
  useAuthStore: jest.fn(() => ({
    setAuth: mockSetAuth,
    loadCurrentUser: mockLoadCurrentUser,
    isLoginProcess: mockIsLoginProcess,
  })),
}))

jest.mock('~/stores/cart', () => ({
  useCartStore: jest.fn(() => ({
    loadCurrentCart: jest.fn(),
    mergeAndLoadCarts: () => mockMergeAndLoadCarts(),
    currentCart: {
      guid: mockGuid,
    },
  })),
}))

jest.mock('~/plugins/cookieHelper', () => ({
  getCookie: jest.fn((ctx, name) => {
    let val = true
    if (ctx.mockVal) {
      val = name in ctx ? ctx[name] : true
    }
    return val
  }),
}))

describe('Preload', () => {
  describe('initial state', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
      jest.clearAllMocks()
      mockIsLoginProcess = false
    })

    test('should preload given all required data', () => {
      preload(mockContext)

      expect(mockDebug).toBeCalledTimes(2)
      expect(mockTrace).toBeCalledTimes(1)
      expect(mockDebug).toBeCalledWith('Token from cookie')
      expect(mockDebug).toBeCalledWith('Preloading user and cart.')
      expect(mockSetAuth).toBeCalledTimes(1)
      expect(mockSetAuth).toBeCalledWith({
        access_token: true,
        id_token: true,
        refresh_token: true,
        token_type: true,
        validUntil: true,
      })
      expect(mockLoadCurrentUser).toBeCalledTimes(1)
    })

    test('should skip setting cart cookie given no cart cookie', () => {
      preload({
        ...mockContext,
        mockVal: true,
        cart: false,
      })

      expect(mockDebug).toBeCalledTimes(2)
      expect(mockTrace).toBeCalledTimes(1)
      expect(mockDebug).toBeCalledWith('Token from cookie')
      expect(mockDebug).toBeCalledWith('Preloading user and cart.')
    })

    test('should preload given isLoginProcess = true', async () => {
      mockIsLoginProcess = true
      await preload(mockContext)

      expect(mockDebug).toBeCalledTimes(2)
      expect(mockTrace).toBeCalledTimes(4)
      expect(mockDebug).toBeCalledWith('Token from cookie')
      expect(mockDebug).toBeCalledWith('During login process')
      expect(mockMergeAndLoadCarts).toBeCalledTimes(1)
    })

    test('should throw error given no access token', () => {
      preload({
        ...mockContext,
        mockVal: true,
        'auth.accessToken': false,
      })

      expect(mockDebug).toBeCalledTimes(2)
      expect(mockDebug).toBeCalledWith(
        'Error when loading cookies',
        expect.anything()
      )
      expect(mockDebug).toBeCalledWith('Preloading user and cart.')
      expect(mockSetAuth).toBeCalledTimes(1)
      expect(mockSetAuth).toBeCalledWith(null)
    })
  })
})
