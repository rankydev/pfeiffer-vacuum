import { shallowMount } from '@vue/test-utils'
import CategoryContentPage from './CategoryContentPage.vue'
import Button from '~/components/atoms/Button/Button.vue'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useContext: () => ({ app: { localePath: (val) => val } }),
  }
})

describe('CategoryContentPage', () => {
  let wrapper

  function createComponent(propsData = {}) {
    wrapper = shallowMount(CategoryContentPage, {
      propsData,
    })
  }

  describe('initial state', () => {
    it('should add a shop button given a category id', () => {
      const content = { categoryShopId: 'someId', quicklinks: [] }
      createComponent({ content })

      const domButton = wrapper.findComponent(Button)
      const href = `shop-categories/${content.categoryShopId.toUpperCase()}`

      expect(domButton.exists()).toBeTruthy()
      expect(domButton.vm.href).toBe(href)
      expect(domButton.vm.label).toBe('navigation.button.shop.label')
    })

    it('should add no shop button given no category id', () => {
      const content = { quicklinks: [] }
      createComponent({ content })

      const domButton = wrapper.findComponent(Button)

      expect(domButton.exists()).toBeFalsy()
    })
  })
})
