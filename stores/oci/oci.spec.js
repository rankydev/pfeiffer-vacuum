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
      expect(ociStore.checkForOciUser).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should invoke checkForOciUser correctly', async () => {
      const ociStore = useOciStore()

      const result = ociStore.checkForOciUser(mockAuth)

      expect(result).toBe(true)
    })
  })

  // describe('business requirements', () => {})
})
