import { shallowMount } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import { createPinia, setActivePinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const mockedRouterNavigation = jest.fn()
const mockIsMobile = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        i18n: {
          t: (key) => key,
        },
        app: {
          localePath: (key) => key,
          $breakpoints: {
            isMobile: mockIsMobile(),
          },
        },
      }
    }),
    useRouter: jest.fn(() => {
      return {
        push: mockedRouterNavigation,
      }
    }),
  }
})

const mockedIsLoggedIn = jest.fn()
const mockedCurrentUser = jest.fn().mockReturnValue(null)
const mockedLogin = jest.fn()
const mockedLogout = jest.fn()
jest.mock('~/stores/user', () => {
  return {
    __esModule: true,
    useUserStore: () => {
      return {
        currentUser: mockedCurrentUser(),
        isLoggedIn: mockedIsLoggedIn(),
        login: mockedLogin,
        logout: mockedLogout,
      }
    },
  }
})
const mockedCurrentCart = ref({})
jest.mock('~/stores/cart', () => {
  return {
    __esModule: true,
    useCartStore: () => {
      return {
        currentCart: mockedCurrentCart,
      }
    },
  }
})

// TODO Uses storeToRefs and needs a rework after nuxt3 upgrade
xdescribe('ShopNavigation', () => {
  beforeEach(() => setActivePinia(createPinia()))
  afterEach(() => jest.clearAllMocks())
  describe('initial state', () => {
    it('should render if logged out', () => {
      mockedIsLoggedIn.mockReturnValue(false)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(1)

      navLinks.wrappers.forEach((eleWrapper) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })
    })

    it('should render if logged in', () => {
      mockedCurrentUser.mockReturnValue({ name: 'Torsten Test' })
      mockedIsLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(1)

      navLinks.wrappers.forEach((eleWrapper) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })
    })
  })
})
