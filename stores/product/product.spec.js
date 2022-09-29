import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from './product'

const mockLogger = jest.fn()
const mockGet = jest.fn()

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: (e) => mockLogger(e),
      },
    }
  },
}))

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return {
      axios: {
        $get: mockGet,
      },
    }
  },
}))

describe('Product store', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    test('should return false initial value', async () => {
      const productStore = useProductStore()
      const productData = await productStore.getProducts()

      expect(productStore.getProducts).toBeInstanceOf(Function)
      expect(productData).toStrictEqual([])
    })
  })

  describe('during interaction', () => {
    test('should invoke getProducts and thorw error', async () => {
      mockGet.mockReturnValue(
        Promise.reject({
          toJSON: () => {
            return 'error'
          },
        })
      )
      const productStore = useProductStore()
      const productData = await productStore.getProducts([])

      expect(mockLogger).toBeCalledWith('error')
      expect(mockLogger).toBeCalledWith(
        "Array expected when fetching multiple products '', returning empty array."
      )
      expect(productData).toStrictEqual([])
    })

    test('should invoke getProducts correctly', async () => {
      mockGet.mockReturnValue(Promise.resolve({ products: ['Produkt1'] }))
      const productStore = useProductStore()
      const ids = []
      const productData = await productStore.getProducts(ids)

      expect(productStore.getProducts).toBeInstanceOf(Function)
      expect(productData).toStrictEqual(['Produkt1'])
    })
  })
})
