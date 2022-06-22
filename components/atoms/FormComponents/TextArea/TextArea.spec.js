import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'
import Label from '~/components/atoms/FormComponents/partials/Label/Label.vue'
import { shallowMount } from '@vue/test-utils'

const propsTextArea = {
  label: 'Test',
  placeholder: 'Placeholder',
  required: false,
}

describe('TextArea', () => {
  describe('initial state', () => {
    test('should be rendered correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('.textarea')

      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should render label component correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(TextArea, { propsData })
      const labelWrapper = wrapper.findComponent(Label)

      expect(labelWrapper.exists()).toBeTruthy()
      expect(labelWrapper.attributes('label')).toBe(propsTextArea.label)
      expect(labelWrapper.attributes('optional')).toBe(
        `${!propsTextArea.required}`
      )
      expect(labelWrapper.attributes('tagname')).toBe('textarea')
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
    test('should be rendered correctly given empty props', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      const textareaLabel = wrapper.find('[for="textarea"]')

      expect(textareaWrapper.exists()).toBeTruthy()
      expect(textareaLabel.exists()).toBeFalsy()
    })
  })
})
