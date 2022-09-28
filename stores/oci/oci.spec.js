import { setActivePinia, createPinia } from 'pinia'
import { useOciStore } from './oci'

const mockAuth = {
  type: 'oci',
}

describe('Oci store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const ociStore = useOciStore()

      expect(ociStore.isOciPage).toBe(false)
      expect(ociStore.hookUrl).toBe('')
      expect(ociStore.returnTarget).toBe('_self')
      expect(ociStore.hiddenUIElements).toStrictEqual({})
      expect(ociStore.customerId).toBe('')
      expect(ociStore.isOciUser).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should invoke isOciUser correctly', async () => {
      const ociStore = useOciStore()

      const result = ociStore.isOciUser(mockAuth)

      expect(result).toBe(true)
    })
  })

  // describe('business requirements', () => {})
})
