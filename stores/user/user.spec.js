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
const mockLoggedIn = ref(false)

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        app: {},
        i18n: {
          t: (key) => key,
        },
      }
    }),
    useRoute: jest.fn(() => ({ value: {} })),
    useRouter: jest.fn(),
    onBeforeMount: jest.fn(),
    onServerPrefetch: jest.fn(),
  }
})

jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        error: (e) => mockLogger(e),
        debug: (e) => mockLogger(e),
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
    }),
  }
})

describe('Auth store', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should return false initial value', () => {
      mockGetUserData.mockReturnValue(mockUser)
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
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(userStore.isApprovedUser).toBeFalsy()
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
      const userStore = useUserStore()

      await userStore.loadCurrentUser()

      expect(mockLogger).toBeCalledTimes(1)
    })
  })
})
