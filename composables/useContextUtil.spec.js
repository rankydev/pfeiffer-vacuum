import { useContextUtil } from './useContextUtil'

let windowSpy
const mockError = jest.fn()
const mockReq = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        trace: jest.fn(),
        error: mockError,
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
    }),
  }
})

beforeEach(() => {
  windowSpy = jest.spyOn(window, 'window', 'get')
  jest.clearAllMocks()
})

afterEach(() => {
  windowSpy.mockRestore()
})

describe('contextUtil', () => {
  describe('during interaction', () => {
    describe('getCurrentHostUrl', () => {
      test('should return url given req on server side', () => {
        mockReq.mockReturnValueOnce({
          protocol: 'https',
          headers: { host: 'www.example.com' },
        })

        const { getCurrentHostUrl } = useContextUtil()

        const url = getCurrentHostUrl()

        expect(url).toBe('https://www.example.com')
      })

      test('should return url given window on client side', () => {
        windowSpy.mockImplementation(() => ({
          location: {
            protocol: 'https:',
            host: 'www.example.com',
          },
        }))

        const { getCurrentHostUrl } = useContextUtil()

        const url = getCurrentHostUrl()

        expect(url).toBe('https://www.example.com')
      })

      test('should log error if req and window are not available', () => {
        windowSpy.mockImplementation(() => undefined)

        const { getCurrentHostUrl } = useContextUtil()

        const url = getCurrentHostUrl()

        expect(url).toBe(null)
        expect(mockError).toBeCalledWith('Error getting current host url.')
      })
    })
  })
})
