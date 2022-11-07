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
const mockReq = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      $axios: {
        create: () => mockAxios(),
      },
      req: mockReq(),
    }),
    useRouter: () => ({
      options: {
        base: 'test',
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
      const { useAxiosForHybris } = require('./useAxiosForHybris')
      const { axios } = useAxiosForHybris()

      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(mockSetBaseUrl).toBeCalledWith('http://localhost/test/api/shop')
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

    test('should return axios instance that was already created on client side', () => {
      const { useAxiosForHybris } = require('./useAxiosForHybris')
      const { axios } = useAxiosForHybris()
      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)

      const { axios: anotherAxios } = useAxiosForHybris()
      expect(anotherAxios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(axios).toStrictEqual(anotherAxios)
    })

    test('should return axios instance from req that was already created on server side', () => {
      mockReq.mockReturnValue({
        protocol: 'http',
        headers: { host: 'www.example.com' },
      })
      const { useAxiosForHybris } = require('./useAxiosForHybris')
      const { axios } = useAxiosForHybris()
      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)

      const { axios: anotherAxios } = useAxiosForHybris()
      expect(anotherAxios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(axios).toStrictEqual(anotherAxios)
      expect(mockSetBaseUrl).toBeCalledWith(
        'http://www.example.com/test/api/shop'
      )
    })
  })
})
