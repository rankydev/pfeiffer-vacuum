import { shallowMount } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

describe('ShopNavigation', () => {
  describe('initial state', () => {
    it('should render', () => {
      const wrapper = shallowMount(ShopNavigation)

      const navItems = wrapper.findAllComponents(Link)

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
