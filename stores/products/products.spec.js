import { expect } from '@jest/globals'
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
      expect(product.code).toBe('128ee16d-cb90-45be-9986-c8006a5235e6_sample')
      expect(product.name).toBe('HiPace® 80')
    })
    test('should return all products from store', () => {
      const productStore = useProductStore()
      const products = productStore.getAllProducts
      expect(products).toBeTruthy()
      expect(productStore.products).toBe(productStore.getAllProducts)
    })
    test('should return no properties given no valid ID', () => {
      const productStore = useProductStore()
      expect(productStore).toBeTruthy()
      const product = productStore.getProductById('715')
      expect(product).toStrictEqual({})
    })
  })
})
