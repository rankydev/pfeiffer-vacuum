import { setActivePinia, createPinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import { useUserStore } from './user'

const mockLogger = jest.fn()
const mockGetUserData = jest.fn()
const mockUser = {
  registrationStatus: {
    code: 'APPROVED',
  },
}
const mockAuth = ref({ auth: { access_token: 'lorem ipsum' } })
let mockLoggedIn = ref(false)
const mockkeycloakInstance = { value: { login: jest.fn(), logout: jest.fn() } }
const mockWatch = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')

  return {
    ...originalModule,
    useContext: () => {
      return {
        app: {
          router: { push: jest.fn() },
          i18n: {
            locale: '',
          },
        },
        i18n: {
          t: (key) => key,
          locale: '',
        },
      }
    },
    useRoute: () => ({ value: {} }),
    useRouter: jest.fn(),
    onBeforeMount: jest.fn(),
    onServerPrefetch: jest.fn(),
    watch: (variable, callback) => mockWatch(variable, callback),
  }
})

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: mockLogger,
        debug: mockLogger,
      },
    }
  },
}))

jest.mock('~/stores/user/partials/useUserApi', () => {
  return {
    useUserApi: () => ({
      getUserData: mockGetUserData,
    }),
  }
})

jest.mock('~/stores/user/partials/useKeycloak', () => {
  return {
    useKeycloak: () => ({
      createKeycloakInstance: jest.fn(),
      auth: mockAuth,
      loggedIn: mockLoggedIn,
      keycloakInstance: mockkeycloakInstance,
      removeCookiesAndDeleteAuthData: jest.fn(),
    }),
  }
})

describe('User store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.resetAllMocks()
  })

  describe('initial state', () => {
    test('should return false initial value', () => {
      mockGetUserData.mockReturnValue(mockUser)
      const userStore = useUserStore()

      expect(userStore.isOpenUser).toBeFalsy()
      expect(userStore.isLeadUser).toBeFalsy()
      expect(userStore.isRejectedUser).toBeFalsy()
      expect(userStore.isApprovedUser).toBeFalsy()
      expect(userStore.loggedIn).toBeFalsy()
      expect(userStore.login).toBeInstanceOf(Function)
    })
  })

  describe('during interaction', () => {
    test('should not load current user given loggedIn = false', async () => {
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(userStore.isOpenUser).toBeFalsy()
      expect(userStore.isLeadUser).toBeFalsy()
      expect(userStore.isRejectedUser).toBeFalsy()
      expect(userStore.isApprovedUser).toBeFalsy()
      expect(userStore.loggedIn).toBeFalsy()
      expect(userStore.currentUser).toBe(null)
    })

    test('should load current user given loggedIn = true', async () => {
      mockLoggedIn.value = true
      mockGetUserData.mockReturnValue(mockUser)
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(userStore.isApprovedUser).toBeTruthy()
      expect(userStore.currentUser).toBe(mockUser)
    })

    test('should throw logger error given user error', async () => {
      mockGetUserData.mockReturnValue(null)
      mockLoggedIn.value = true
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(mockLogger).toBeCalledWith('user not found', null)
    })

    test('should invoke login correctly', async () => {
      const userStore = useUserStore()

      await userStore.login()

      expect(mockLogger).toBeCalledWith('login')
    })

    test('should invoke logout correctly', async () => {
      const userStore = useUserStore()

      await userStore.logout()

      expect(mockLogger).toBeCalledWith('logout')
    })

    test('should redirect if no keycloak instance is available', async () => {
      mockkeycloakInstance.value = null
      const userStore = useUserStore()
      await userStore.logout()

      expect(mockLogger).toBeCalledWith('logout')
    })

    test('should load current user when auth has changed', async () => {
      mockLoggedIn.value = true
      mockGetUserData.mockReturnValue(mockUser)
      let watchCallback = null
      mockWatch.mockImplementation((auth, callback) => {
        watchCallback = callback
      })
      const userStore = useUserStore()
      await watchCallback({ access_token: 'validToken' })

      expect(userStore.currentUser).toBe(mockUser)
    })

    test('should reset user when auth has changed but new auth object is undefined', async () => {
      let watchCallback = null
      mockWatch.mockImplementation((auth, callback) => {
        watchCallback = callback
      })
      const userStore = useUserStore()
      await watchCallback(undefined)

      expect(userStore.currentUser).toBe(null)
    })
  })
})
