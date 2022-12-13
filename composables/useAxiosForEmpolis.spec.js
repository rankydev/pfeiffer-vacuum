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
      $config: {
        EMPOLIS_TIMEOUT: 123,
        EMPOLIS_STAGE: 'stage',
      },
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

describe('axiosForEmpolis', () => {
  describe('during interaction', () => {
    test('should return axios instance with proper configuration', () => {
      const { useAxiosForEmpolis } = require('./useAxiosForEmpolis')
      const { axios } = useAxiosForEmpolis()

      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(mockSetBaseUrl).toBeCalledWith(
        'http://localhost/test/api/empolis/environments/stage'
      )
      expect(mockSetHeader).toBeCalledWith('Content-Type', 'application/json')
      expect(mockUseRequestInterceptor).toBeCalledWith(
        'fulfilledRequest',
        'rejectedRequest'
      )
    })

    test('should return axios instance that was already created on client side', () => {
      const { useAxiosForEmpolis } = require('./useAxiosForEmpolis')
      const { axios } = useAxiosForEmpolis()
      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)

      const { axios: anotherAxios } = useAxiosForEmpolis()
      expect(anotherAxios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(axios).toStrictEqual(anotherAxios)
    })

    test('should return axios instance from req that was already created on server side', () => {
      mockReq.mockReturnValue({
        protocol: 'http',
        headers: { host: 'www.example.com' },
      })
      const { useAxiosForEmpolis } = require('./useAxiosForEmpolis')
      const { axios } = useAxiosForEmpolis()
      expect(axios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)

      const { axios: anotherAxios } = useAxiosForEmpolis()
      expect(anotherAxios).toBeDefined()
      expect(mockAxios).toBeCalledTimes(1)
      expect(axios).toStrictEqual(anotherAxios)
      expect(mockSetBaseUrl).toBeCalledWith(
        'http://www.example.com/test/api/empolis/environments/stage'
      )
    })
  })
})
