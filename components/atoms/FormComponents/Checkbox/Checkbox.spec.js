import Checkbox from './Checkbox'
import { label } from './Checkbox.stories.content'
import { shallowMount } from '@vue/test-utils'

describe('Checkbox', () => {
  describe('initial state', () => {
    test('should render checkbox given required props', () => {
      const wrapper = shallowMount(Checkbox, { propsData: { label } })

      const checkboxWrapper = wrapper.find('.checkbox')
      const input = wrapper.find('.checkbox__input')

      expect(checkboxWrapper.text()).toBe(label)
      expect(input.exists()).toBeTruthy()
    })

    test('should set checked state on input given checked prop', () => {
      const wrapper = shallowMount(Checkbox, {
        propsData: { label, checked: true },
      })

      const input = wrapper.find('.checkbox__input')

      expect(input.element.checked).toBeTruthy()
    })

    test('should set checked state on input given checked prop', () => {
      const wrapper = shallowMount(Checkbox, {
        propsData: { label, disabled: true },
      })

      const disabledWrapper = wrapper.find('.checkbox--disabled')
      const input = wrapper.find('.checkbox__input')

      expect(input.attributes('disabled')).toBeTruthy()
      expect(disabledWrapper.exists()).toBeTruthy()
    })
  })
})
