import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Header from './Header.vue'

import Logo from '~/components/atoms/Logo/Logo.vue'
import SearchHeader from './partials/SearchHeader/SearchHeader.vue'
import TopNavigation from './partials/TopNavigation/TopNavigation.vue'
import MainNavigation from './partials/MainNavigation/MainNavigation.vue'
import ShopNavigation from './partials/ShopNavigation/ShopNavigation.vue'

describe('Header', () => {
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
      expect(link.vm.to).toBe('/default')

      const logo = link.findComponent(Logo)
      expect(logo.exists()).toBeTruthy()
    })
  })
})
