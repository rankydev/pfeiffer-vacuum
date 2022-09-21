import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from './product'

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
      const userStore = useUserStore()

      expect(userStore.isOciUser).toBeFalsy()
      expect(userStore.isOpenUser).toBeFalsy()
      expect(userStore.isLeadUser).toBeFalsy()
      expect(userStore.isRejectedUser).toBeFalsy()
      expect(userStore.isApprovedUser).toBeFalsy()
      expect(userStore.loggedIn).toBeFalsy()
    })
  })

  describe('during interaction', () => {
    test('should not load current user given loggedIn = false', async () => {
      setHybrisApi(mockUser)
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(userStore.isApprovedUser).toBeFalsy()
      expect(userStore.currentUser).toBe(null)
    })

    test('should load current user given loggedIn = true', async () => {
      setHybrisApi(mockUser)
      const userStore = useUserStore()

      await userStore.$patch(mockAuth)
      await userStore.loadCurrentUser()

      expect(userStore.isApprovedUser).toBeTruthy()
      expect(userStore.currentUser).toBe(mockUser)
    })

    test('should throw logger error given user error', async () => {
      setHybrisApi(null)
      const userStore = useUserStore()

      await userStore.$patch(mockAuth)
      await userStore.loadCurrentUser()

      expect(mockLogger).toBeCalledTimes(1)
    })

    test('should set auth data', async () => {
      const userStore = useUserStore()

      await userStore.setAuth(mockAuth)
      expect(userStore.auth).toBe(mockAuth)
    })

    test('should reset data given no auth', async () => {
      const userStore = useUserStore()

      await userStore.setAuth(null)
      expect(mockVsmReset).toBeCalledTimes(1)
    })
  })
})
