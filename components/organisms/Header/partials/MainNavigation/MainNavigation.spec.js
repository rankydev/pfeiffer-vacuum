import { shallowMount } from '@vue/test-utils'
import MainNavigation from './MainNavigation.vue'
import navigationEntries from '../MainNavigationLevel/MainNavigationLevel.stories.content.js'
import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'
import MainNavigationLevel from '../MainNavigationLevel/MainNavigationLevel.vue'
import { useMenuStore } from '~/stores/menu'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(MainNavigation, { propsData })
}

describe('MainNavigation', () => {
  describe('initial state', () => {
    it('should render BurgerIcon and MainNavigationLevel', () => {
      createComponent()

      const burgerIcon = wrapper.findComponent(BurgerIcon)
      const mainNavigationLevel = wrapper.findComponent(MainNavigationLevel)

      expect(burgerIcon.exists()).toBeTruthy()
      expect(mainNavigationLevel.exists()).toBeTruthy()
    })
  })

  describe('during interaction', () => {
    afterEach(() => {
      useMenuStore().close()
    })

    it('should set the active class when burger icon was clicked', async () => {
      createComponent({ navigationEntries })

      const burgerIcon = wrapper.findComponent(BurgerIcon)
      burgerIcon.trigger('click')
      await wrapper.vm.$nextTick()
      const navWrapper = wrapper.find('.main-navigation__items')

      expect(navWrapper.attributes('class')).toMatch(
        'main-navigation__items--active'
      )
    })

    it('should set the active class when enter key was pressed', async () => {
      createComponent({ navigationEntries })

      const burgerIcon = wrapper.findComponent(BurgerIcon)
      burgerIcon.trigger('keypress.enter')
      await wrapper.vm.$nextTick()
      const navWrapper = wrapper.find('.main-navigation__items')

      expect(navWrapper.attributes('class')).toMatch(
        'main-navigation__items--active'
      )
    })
  })

  // describe('business requirements', () => {})
})
