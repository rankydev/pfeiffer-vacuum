import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'
import { shallowMount } from '@vue/test-utils'

const propsTextArea = {
  label: 'Test',
  placeholder: 'Placeholder',
}

describe('TextArea', () => {
  describe('initial state', () => {
    const propsData = { ...propsTextArea }
    const wrapper = shallowMount(TextArea, { propsData })

    test('should be rendered correctly given props', () => {
      const textareaWrapper = wrapper.find('div')

      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should render label component correctly given props', () => {
      const labelWrapper = wrapper.find('Label')

      expect(labelWrapper).toBeTruthy()
    })
    test('should render textarea correctly given props', () => {
      const textAreaWrapper = wrapper.find('.textarea__input')
      expect(textAreaWrapper.attributes('placeholder')).toEqual(
        propsTextArea.placeholder
      )
      expect(textAreaWrapper.attributes('required')).toBeFalsy()
      expect(textAreaWrapper.attributes('disabled')).toBeFalsy()
    })
    test('should be rendered correctly given empty props', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      const textareaLabel = wrapper.find('[for="textarea"]')

      expect(textareaWrapper.exists()).toBeTruthy()
      expect(textareaLabel.exists()).toBeFalsy()
    })
    test('should render label correctly given required=true prop', () => {
      const propsData = {
        required: true,
      }
      const wrapper = shallowMount(TextArea, { propsData })
      const optionalLabel = wrapper.find('.textarea__right-label')
      expect(optionalLabel.exists()).toBeFalsy()
    })
  })
})
