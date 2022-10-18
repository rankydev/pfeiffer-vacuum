import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea.vue'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel.vue'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import { required } from '@vuelidate/validators'

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
      const errorIcon = wrapper.find('.pv-textarea__icon-error')

      expect(textAreaWrapper.attributes('placeholder')).toEqual(
        propsTextArea.placeholder
      )
      expect(textAreaWrapper.attributes('required')).toBeFalsy()
      expect(textAreaWrapper.attributes('disabled')).toBeFalsy()
      expect(errorIcon.exists()).toBeFalsy()
    })
    test('should be rendered correctly given empty props', () => {
      const propsData = {}
      const wrapper = shallowMount(PvTextArea, { propsData })
      const textareaWrapper = wrapper.find('div')
      const textareaLabel = wrapper.find('[for="textarea"]')

      expect(textareaWrapper.exists()).toBeTruthy()
      expect(textareaLabel.exists()).toBeFalsy()
    })

    describe('during interaction', () => {
      it('should emit update event when a key is pressed', () => {
        const value = 'Some Value'
        const wrapper = shallowMount(PvTextArea)
        const input = wrapper.find('textarea')

        input.setValue(value)

        expect(wrapper.emitted().update.length).toBe(1)
        expect(wrapper.emitted().update[0]).toEqual([value])
      })

      it('should emit an focus event when input was focused', () => {
        const div = document.createElement('div')
        div.id = 'root'
        document.body.appendChild(div)
        const wrapper = shallowMount(PvTextArea, { attachTo: '#root' })
        const input = wrapper.find('textarea')

        input.trigger('focus')

        expect(wrapper.emitted().focus.length).toBe(1)
        expect(wrapper.emitted().focus[0]).toEqual([true])
        wrapper.destroy()
      })

      it('should emit an blur event when input was blurred', () => {
        const wrapper = shallowMount(PvTextArea)
        const input = wrapper.find('textarea')

        input.trigger('blur')

        expect(wrapper.emitted().focus.length).toBe(1)
        expect(wrapper.emitted().focus[0]).toEqual([false])
      })
      it('should throw correct error message when required input is not set yet', () => {
        const propsData = {
          required: true,
          rules: { required },
        }

        const wrapper = shallowMount(PvTextArea, { propsData })
        const input = wrapper.find('textarea')

        input.setValue('')

        expect(wrapper.vm.validation.getError()).toBe('Value is required')
      })
    })
  })
})
