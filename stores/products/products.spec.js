import { createPinia, setActivePinia } from 'pinia/dist/pinia.mjs'
import { useProductStore } from './product'

describe('Page store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const productStore = useProductStore()
    })
  })
})
