import { expect } from '@jest/globals'
import { setActivePinia, createPinia } from 'pinia'
import { useKeycloak } from './useKeycloak'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  const { ref } = originalModule

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
    ssrRef: ref,
  }
})

const mockDebug = jest.fn()
const mockError = jest.fn()
jest.mock('~/composables/useLogger', () => ({
  useLogger: () => {
    return {
      logger: {
        debug: mockDebug,
        error: mockError,
        trace: jest.fn(),
      },
    }
  },
}))

const mockGetCurrentHostUrl = jest.fn()
jest.mock('~/composables/useContextUtil', () => {
  return {
    useContextUtil: () => ({
      getCurrentHostUrl: mockGetCurrentHostUrl,
    }),
  }
})

const mockSetCookie = jest.fn()
const mockRemoveCookie = jest.fn()
const mockGetCookie = jest.fn()
jest.mock('~/composables/useCookieHelper', () => {
  return {
    useCookieHelper: () => ({
      setCookie: mockSetCookie,
      removeCookie: mockRemoveCookie,
      getCookie: mockGetCookie,
    }),
  }
})

describe('useKeycloak', () => {
  beforeEach(() => setActivePinia(createPinia()))

  describe('initial state', () => {
    test('should initialize composable', () => {
      const {
        keycloakInstance,
        auth,
        createKeycloakInstance,
        removeCookiesAndDeleteAuthData,
        isLoggedIn,
        isLoginProcess,
      } = useKeycloak()

      expect(keycloakInstance.value).toBeNull()
      expect(auth.value).toBeNull()
      expect(createKeycloakInstance).toBeInstanceOf(Function)
      expect(removeCookiesAndDeleteAuthData).toBeInstanceOf(Function)
      expect(isLoggedIn.value).toBe(false)
      expect(isLoginProcess.value).toBe(false)
    })
  })

  describe('during interaction', () => {})
})
