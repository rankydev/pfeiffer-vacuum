import { setActivePinia, createPinia } from 'pinia'
import { useOciStore } from './oci'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => {
      return {
        $config: {
          CURRENT_REGION_CODE: 'oci',
        },
      }
    },
  }
})

describe('Oci store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const ociStore = useOciStore()

      expect(ociStore.isOciPage).toBe(true)
      expect(ociStore.hookUrl).toBe(undefined)
      expect(ociStore.returnTarget).toBe('_self')
      expect(ociStore.customerId).toBe(undefined)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
