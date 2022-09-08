import preload from './preload'
import { createPinia, setActivePinia } from 'pinia'

const mockDebug = jest.fn()
const mockTrace = jest.fn()

const mockLogger = jest.fn(() => ({
  debug: mockDebug,
  trace: mockTrace,
}))

let mockContext = { getLoggerFor: mockLogger }

jest.mock('~/stores/auth', () => ({
  useAuthStore: jest.fn(() => ({
    setAuth: jest.fn(),
    loadCurrentUser: jest.fn(),
  })),
}))

jest.mock('~/stores/cart', () => ({
  useCartStore: jest.fn(() => ({
    loadCurrentCart: jest.fn(),
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
    })

    test('should preload given all required data', () => {
      preload(mockContext)

      expect(mockDebug).toBeCalledTimes(2)
      expect(mockTrace).toBeCalledTimes(1)
      expect(mockDebug).toBeCalledWith('Token from cookie')
      expect(mockDebug).toBeCalledWith('Preloading user and cart.')
    })

    test.skip('should preload given isLoginProcess = true', () => {
      preload(mockContext)
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
    })
  })
})
