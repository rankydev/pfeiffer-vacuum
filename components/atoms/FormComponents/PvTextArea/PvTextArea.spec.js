import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea.vue'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel.vue'
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
      const wrapper = shallowMount(PvTextArea, { propsData })
      const textareaWrapper = wrapper.find('.pv-textarea')

      expect(textareaWrapper.exists()).toBeTruthy()
    })
    test('should render label component correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(PvTextArea, { propsData })
      const labelWrapper = wrapper.findComponent(PvLabel)

      expect(labelWrapper.exists()).toBeTruthy()
      expect(labelWrapper.attributes('label')).toBe(propsTextArea.label)
      expect(labelWrapper.attributes('optional')).toBe(
        `${!propsTextArea.required}`
      )
      expect(labelWrapper.attributes('tagname')).toBe('textarea')
    })
    test('should render textarea correctly given props', () => {
      const propsData = { ...propsTextArea }
      const wrapper = shallowMount(PvTextArea, { propsData })
      const textAreaWrapper = wrapper.find('.pv-textarea__input')
      expect(textAreaWrapper.attributes('placeholder')).toEqual(
        propsTextArea.placeholder
      )
      expect(textAreaWrapper.attributes('required')).toBeFalsy()
      expect(textAreaWrapper.attributes('disabled')).toBeFalsy()
    })
    test('should be rendered correctly given empty props', () => {
      const propsData = {}
      const wrapper = shallowMount(PvTextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      const textareaLabel = wrapper.find('[for="textarea"]')

      expect(textareaWrapper.exists()).toBeTruthy()
      expect(textareaLabel.exists()).toBeFalsy()
    })
  })
})
