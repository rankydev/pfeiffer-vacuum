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
        'f35d5da3-6db5-4175-aa5b-0ba195e3789a_sample'
      )
      expect(product).toBeTruthy()
      // TODO: test fails (returns undefined instead of code)
      expect(product.code).toBe('f35d5da3-6db5-4175-aa5b-0ba195e3789a_sample')
      expect(product.name).toBe('HiPace® 800')
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
    // TODO: more test scenarios needed?
  })
})
