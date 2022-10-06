import { setActivePinia, createPinia } from 'pinia'
import { useUserApi } from './useUserApi'

const mockPost = jest.fn()

jest.mock('~/composables/useAxiosForHybris', () => ({
  useAxiosForHybris: () => {
    return {
      axios: {
        $get: jest.fn(() => 'userData'),
        $post: mockPost,
      },
    }
  },
}))

describe('User Api store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return all expected properties', () => {
      const userApiStore = useUserApi()

      expect(userApiStore.getUserData).toBeInstanceOf(Function)
      expect(userApiStore.register).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should invoke getUserData correctly', async () => {
      const userApiStore = useUserApi()

      const userData = await userApiStore.getUserData()

      expect(userData).toBe('userData')
    })

    test('should invoke register correctly', async () => {
      const userApiStore = useUserApi()

      const customer = { firstName: 'Uwe', lastName: 'Unterdruck' }
      mockPost.mockReturnValue('NotAnonymous')
      const registerData = await userApiStore.register(customer, false)

      expect(mockPost).toBeCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/current/orgCustomers',
        customer
      )
      expect(registerData).toBe('NotAnonymous')
    })

    test('should invoke register correctly with anonymous user', async () => {
      const userApiStore = useUserApi()

      const customer = { firstName: 'Uwe', lastName: 'Unterdruck' }
      mockPost.mockReturnValue('Anonymous')
      const registerData = await userApiStore.register(customer)

      expect(mockPost).toBeCalledWith(
        '/pfeifferwebservices/v2/pfeiffer/users/anonymous/orgCustomers',
        customer
      )
      expect(registerData).toBe('Anonymous')
    })
  })

  // describe('business requirements', () => {})
})
