import { shallowMount } from '@vue/test-utils'
import MainNavigation from './MainNavigation.vue'

describe('MainNavigation', () => {
  describe('initial state', () => {
    it('should render all items', () => {
      const wrapper = shallowMount(MainNavigation)

      const navItems = wrapper.findAll('.main-navigation__item')

      navItems.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.text()).toBe(wrapper.vm.mockItems[idx])
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
