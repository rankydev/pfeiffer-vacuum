import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

describe('ShopNavigation', () => {
  describe('initial state', () => {
    it('should render', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(ShopNavigation, { stubs })

      const navItems = wrapper.findAllComponents(RouterLinkStub)

      expect(navItems.length).toBe(4)

      navItems.wrappers.forEach((eleWrapper, idx) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
