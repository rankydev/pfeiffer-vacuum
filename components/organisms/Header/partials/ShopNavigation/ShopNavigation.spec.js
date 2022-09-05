import { shallowMount } from '@vue/test-utils'
import ShopNavigation from './ShopNavigation.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'
import { createPinia, setActivePinia } from 'pinia'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: jest.fn(() => {
      return {
        $authApi: {
          logout: jest.fn(),
        },
        i18n: {
          t: jest.fn(),
        },
      }
    }),
  }
})

describe('ShopNavigation', () => {
  beforeEach(() => setActivePinia(createPinia()))
  describe('initial state', () => {
    it('should render', () => {
      const wrapper = shallowMount(ShopNavigation)

      const navItems = wrapper.findAllComponents(Link)

      expect(navItems.length).toBe(2)

      navItems.wrappers.forEach((eleWrapper, idx) => {
        const icon = eleWrapper.findComponent(Icon)

        expect(icon.exists()).toBeTruthy()
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
