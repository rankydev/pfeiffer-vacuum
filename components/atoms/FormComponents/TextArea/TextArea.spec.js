import TextArea from './TextArea.vue'
import { shallowMount } from '@vue/test-utils'

const propsTextArea = {
  text: '',
  label: 'Test',
  placeholder: 'Placeholder',
}

describe('TextArea', () => {
  describe('initial state', () => {
    test('should be rendered correctly given empty props', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      const textareaLabel = wrapper.find('[for="textarea"]')

      expect(textareaWrapper.exists()).toBeTruthy()
      expect(textareaLabel.exists()).toBeFalsy()
    })
    test('should be rendered correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')

      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should render labels correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const labelWrapper = wrapper.findAll('label')

      expect(labelWrapper.at(0).text()).toBe('Test')
      expect(labelWrapper.at(1).text()).toBe('(optional)')
    })
    test('should render label correctly given required=true prop', () => {
      const propsData = {
        required: true,
      }
      const wrapper = shallowMount(TextArea, { propsData })
      const optionalLabel = wrapper.find('.textarea__right-label')
      expect(optionalLabel.exists()).toBeFalsy()
    })
    test('should render textarea correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const textAreaWrapper = wrapper.find('.textarea__input')
      expect(textAreaWrapper.attributes('placeholder')).toEqual(
        propsTextArea.placeholder
      )
      expect(textAreaWrapper.attributes('required')).toBeFalsy()
      expect(textAreaWrapper.attributes('disabled')).toBeFalsy()
    })
  })
})
