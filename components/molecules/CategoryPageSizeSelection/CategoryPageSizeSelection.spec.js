import CategoryPageSizeSelection from './CategoryPageSizeSelection'
import Button from '~/components/atoms/Button/Button'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

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

  describe('during interaction', () => {
    test('should emit change event when value is clicked', async () => {
      const wrapper = shallowMount(CategoryPageSizeSelection, {
        propsData: { active: 9 },
      })

      const button = wrapper.findComponent(Button)
      button.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().change.length).toBe(1)
      expect(wrapper.emitted().change[0][0]).toEqual(9)
    })
  })
})
