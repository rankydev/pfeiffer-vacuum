import TextArea from './TextArea.vue'
import { shallowMount, mount } from '@vue/test-utils'

const defaultTextArea = {
  placeholder: 'Placeholder',
  text: '',
  label: 'Test',
  required: false,
  disabled: false,
}

describe('TextArea', () => {
  describe('initial state', () => {
    test('should be rendered correctly given no props', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should be rendered correctly given props', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should render labels correctly given props', () => {
      const propsData = { ...defaultTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const labelWrapper = wrapper.findAll('label')
      expect(labelWrapper.at(0).text()).toBe('Test')
      expect(labelWrapper.at(1).text()).toBe('(optional)')
    })
    test('should render textarea correctly given props', () => {
      const propsData = { ...defaultTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const textAreaWrapper = wrapper.find('.pv-input__element')
      expect(textAreaWrapper.attributes('placeholder')).toEqual(
        defaultTextArea.placeholder
      )
      expect(textAreaWrapper.attributes('required')).toBeFalsy()
      expect(textAreaWrapper.attributes('disabled')).toBeFalsy()
    })
  })
})
