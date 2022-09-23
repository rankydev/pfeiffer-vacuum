import { shallowMount } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { createPinia, setActivePinia } from 'pinia'
import { expect } from '@jest/globals'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        i18n: {
          t: (key) => key,
        },
      }
    }),
  }
})

const mockedLoggedIn = jest.fn()
const mockedCurrentUser = jest.fn()
const mockedLogin = jest.fn()
const mockedLogout = jest.fn()
jest.mock('~/stores/user', () => {
  return {
    __esModule: true,
    useUserStore: () => {
      return {
        currentUser: mockedCurrentUser(),
        loggedIn: mockedLoggedIn(),
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
      mockedCurrentUser.mockReturnValue(null)
      mockedLoggedIn.mockReturnValue(false)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(2)

      navLinks.wrappers.forEach((eleWrapper, idx) => {
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
      mockedLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const navLinks = wrapper.findAllComponents(Link)

      expect(navLinks.length).toBe(2)

      navLinks.wrappers.forEach((eleWrapper, idx) => {
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
      mockedCurrentUser.mockReturnValue(null)
      mockedLoggedIn.mockReturnValue(false)
      const wrapper = shallowMount(ShopNavigation)
      const loginButton = wrapper.findComponent(Button)

      loginButton.vm.$emit('click')

      expect(mockedLogin).toBeCalledTimes(1)
    })

    it('should not login on click if already logged in', () => {
      mockedCurrentUser.mockReturnValue(null)
      mockedLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const loginButton = wrapper.findComponent(Button)

      loginButton.vm.$emit('click')

      expect(mockedLogin).toBeCalledTimes(0)
    })

    it('should log out on click if logged in', () => {
      mockedCurrentUser.mockReturnValue(null)
      mockedLoggedIn.mockReturnValue(true)
      const wrapper = shallowMount(ShopNavigation)
      const logoutButton = wrapper.findAllComponents(Button).at(1)

      logoutButton.vm.$emit('click')

      expect(mockedLogout).toBeCalledTimes(1)
    })
  })

  // describe('business requirements', () => {})
})
