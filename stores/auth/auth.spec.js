import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'

const mockLogger = jest.fn()
const mockVsmReset = jest.fn()
const mockUser = {
  registrationStatus: {
    code: 'APPROVED',
  },
}
const mockAuth = { auth: { access_token: 'lorem ipsum' } }

jest.mock('~/utils/getLoggerFor', () => {
  return () => ({
    error: (e) => mockLogger(e),
  })
})

jest.mock('~/stores/vsm', () => {
  return {
    useVsmStore: () => ({
      resetVsmUser: () => mockVsmReset(),
    }),
  }
})

const setHybrisApi = (user) => {
  window.$nuxt.$hybrisApi = {
    userApi: {
      getUserData: jest.fn(() => {
        return user
      }),
    },
  }
}

describe('Auth store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return false initial value', () => {
      setHybrisApi(mockUser)
      const authStore = useAuthStore()

      expect(authStore.isOciUser).toBeFalsy()
      expect(authStore.isOpenUser).toBeFalsy()
      expect(authStore.isLeadUser).toBeFalsy()
      expect(authStore.isRejectedUser).toBeFalsy()
      expect(authStore.isApprovedUser).toBeFalsy()
      expect(authStore.loggedIn).toBeFalsy()
    })
  })

  describe('during interaction', () => {
    test('should not load current user given loggedIn = false', async () => {
      setHybrisApi(mockUser)
      const authStore = useAuthStore()

      await authStore.loadCurrentUser()

      expect(authStore.isApprovedUser).toBeFalsy()
      expect(authStore.currentUser).toBe(null)
    })

    test('should load current user given loggedIn = true', async () => {
      setHybrisApi(mockUser)
      const authStore = useAuthStore()

      await authStore.$patch(mockAuth)
      await authStore.loadCurrentUser()

      expect(authStore.isApprovedUser).toBeTruthy()
      expect(authStore.currentUser).toBe(mockUser)
    })

    test('should throw logger error given user error', async () => {
      setHybrisApi(null)
      const authStore = useAuthStore()

      await authStore.$patch(mockAuth)
      await authStore.loadCurrentUser()

      expect(mockLogger).toBeCalledTimes(1)
    })

    test('should set auth data', async () => {
      const authStore = useAuthStore()

      await authStore.setAuth(mockAuth)
      expect(authStore.auth).toBe(mockAuth)
    })

    test('should reset data given no auth', async () => {
      const authStore = useAuthStore()

      await authStore.setAuth(null)
      expect(mockVsmReset).toBeCalledTimes(1)
    })
  })
})
