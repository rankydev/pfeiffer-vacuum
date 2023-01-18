import { shallowMount } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { createPinia, setActivePinia } from 'pinia'

const mockedRouterNavigation = jest.fn()
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

describe('ShopNavigation', () => {
  beforeEach(() => setActivePinia(createPinia()))
  afterEach(() => jest.clearAllMocks())
  describe('initial state', () => {
    it('should render if logged out', () => {
      mockedIsLoggedIn.mockReturnValue(false)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(2)

      navLinks.wrappers.forEach((eleWrapper) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })

      const navButtons = wrapper.findAllComponents(Button)

      expect(navButtons.length).toBe(1)
      expect(navButtons.at(0).vm.label).toBe('navigation.button.signIn.label')
      expect(navButtons.at(0).vm.icon).toBe('person')
    })

    it('should render if logged in', () => {
      mockedCurrentUser.mockReturnValue({ name: 'Torsten Test' })
      mockedIsLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(3)

      navLinks.wrappers.forEach((eleWrapper) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })

      const navButtons = wrapper.findAllComponents(Button)

      expect(navButtons.length).toBe(2)
      expect(navButtons.at(0).vm.label).toBe('Torsten Test')
      expect(navButtons.at(1).vm.label).toBe(null)
      expect(navButtons.at(1).vm.icon).toBe('logout')
    })
  })

  describe('during interaction', () => {
    it('should login on click', () => {
      mockedIsLoggedIn.mockReturnValue(false)
      const wrapper = shallowMount(ShopNavigation)
      const loginButton = wrapper.findComponent(Button)

      loginButton.vm.$emit('click')

      expect(mockedLogin).toBeCalledTimes(1)
    })

    it('should not login on click if already logged in but redirect to my account area', () => {
      mockedIsLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const loginButton = wrapper.findComponent(Button)

      loginButton.vm.$emit('click')

      expect(mockedRouterNavigation).toBeCalledTimes(1)
      expect(mockedRouterNavigation).toBeCalledWith({ path: 'shop-my-account' })
      expect(mockedLogin).toBeCalledTimes(0)
    })

    it('should log out on click if logged in', () => {
      mockedIsLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const logoutButton = wrapper.findAllComponents(Button).at(1)

      logoutButton.vm.$emit('click')

      expect(mockedLogout).toBeCalledTimes(1)
    })
  })

  // describe('business requirements', () => {})
})
