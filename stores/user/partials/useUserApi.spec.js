import { setActivePinia, createPinia } from 'pinia'
import { useUserApi } from './useUserApi'

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return {
      axios: {
        $get: () => 'userData',
        $post: () => 'userData',
      },
    }
  },
}))

describe('User Api store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const userApiStore = useUserApi()
    })
  })

  describe('during interaction', () => {
    test('should invoke getUserData correctly', async () => {
      const userApiStore = useUserApi()
    })

    test('should invoke register correctly', async () => {
      const userApiStore = useUserApi()
    })
  })

  // describe('business requirements', () => {})
})
