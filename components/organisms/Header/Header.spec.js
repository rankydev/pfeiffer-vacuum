import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from './Header.vue'
import Logo from '~/components/atoms/Logo/Logo.vue'
import SearchHeader from './partials/SearchHeader/SearchHeader.vue'
import TopNavigation from './partials/TopNavigation/TopNavigation.vue'
import MainNavigation from './partials/MainNavigation/MainNavigation.vue'
import ShopNavigation from './partials/ShopNavigation/ShopNavigation.vue'

const mockedHydrateMenuItems = jest.fn()
jest.mock('~/stores/myaccount', () => {
  return {
    __esModule: true,
    useMyAccountStore: () => {
      return {
        hydrateMenuItems: mockedHydrateMenuItems,
      }
    },
  }
})

jest.mock('~/stores/menu', () => {
  const compositionApi = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    useMenuStore: () => {
      return {
        isActive: compositionApi.ref(true),
        toggle: jest.fn(),
        open: jest.fn(),
        close: jest.fn(),
      }
    },
  }
})

// TODO Uses storeToRefs and needs a rework after nuxt3 upgrade
xdescribe('Header', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Header, { stubs })

      const logo = wrapper.findComponent(Logo)
      const searchHeader = wrapper.findComponent(SearchHeader)
      const topNavigation = wrapper.findComponent(TopNavigation)
      const mainNavigation = wrapper.findComponent(MainNavigation)
      const shopNavigation = wrapper.findComponent(ShopNavigation)

      expect(logo.exists()).toBeTruthy()
      expect(searchHeader.exists()).toBeTruthy()
      expect(topNavigation.exists()).toBeTruthy()
      expect(mainNavigation.exists()).toBeTruthy()
      expect(shopNavigation.exists()).toBeTruthy()
    })
  })

  // describe('during interaction', () => {})

  describe('business requirements', () => {
    it('should render a home link around the logo', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Header, { stubs })

      const link = wrapper.findComponent(RouterLinkStub)
      expect(link.exists()).toBeTruthy()
      expect(link.vm.to).toBe('/')

      const logo = link.findComponent(Logo)
      expect(logo.exists()).toBeTruthy()
    })
  })
})
