import CategoryPageSizeSelection from './CategoryPageSizeSelection'
import { shallowMount } from '@vue/test-utils'
import Button from '~/components/atoms/Button/Button'

describe('CategoryPageSizeSelection', () => {
  describe('initial state', () => {
    test('should render given props', () => {
      const wrapper = shallowMount(CategoryPageSizeSelection, {
        propsData: { active: 9 },
      })
      const component = wrapper.find('.category-page-size-selection')
      const text = wrapper.find('.category-page-size-selection__text')
      const buttons = wrapper.findAllComponents(Button)

      expect(component.exists()).toBeTruthy()
      expect(text.exists()).toBeTruthy()
      expect(buttons).toHaveLength(4)
    })
  })
})
