import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from './products'

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties and getters.', () => {
      const productStore = useProductStore()
      expect(productStore).toBeTruthy()
      const product = productStore.getProductById(
        '128ee16d-cb90-45be-9986-c8006a5235e6_sample'
      )
      expect(product).toBeTruthy()
      const products = productStore.getAllProducts
      expect(products).toBeTruthy()
    })
  })
})
