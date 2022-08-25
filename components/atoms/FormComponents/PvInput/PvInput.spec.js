import { shallowMount } from '@vue/test-utils'
import Input from './PvInput.vue'
import Icon from '../../Icon/Icon.vue'
import PvLabel from '../partials/PvLabel/PvLabel.vue'
import { expect } from '@jest/globals'
import { required, email } from '@vuelidate/validators'

describe('Input', () => {
  describe('initial state', () => {
    it('should render empty component when no data provided', () => {
      const wrapper = shallowMount(Input)
      const icon = wrapper.findComponent(Icon)
      const input = wrapper.findComponent(Input)
      const label = wrapper.findComponent(PvLabel)

      expect(icon.exists()).toBeFalsy()
      expect(input.exists()).toBeTruthy()
      expect(label.exists()).toBeTruthy()
    })

    it('should set the value to the input when provided', () => {
      const propsData = { value: 'Some Value' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      expect(input.element.value).toBe(propsData.value)
    })

    it('should set a placeholder when provided', () => {
      const propsData = { placeholder: 'Some Placeholder' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      expect(input.attributes('placeholder')).toBe(propsData.placeholder)
    })

    it('should disable input when disabled is set to true', () => {
      const propsData = { disabled: true }
      const wrapper = shallowMount(Input, { propsData })
      const inputWrapper = wrapper.find('.pv-input__element')

      expect(inputWrapper.attributes('disabled')).toBeTruthy()
      expect(inputWrapper.attributes('required')).toBeFalsy()
    })

    it('should set a label when provided', () => {
      const propsData = { label: 'Some Label' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.findComponent(PvLabel)

      expect(input.attributes('label')).toBe(propsData.label)
    })

    it('should set error class on input element when validation throws error', async () => {
      const propsData = {
        required: true,
        rules: { required, email },
        validate: true,
      }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      input.setValue('test')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.pv-input__element--error').exists()).toBeTruthy()
    })

    it('should throw correct error message when required input is not set yet', () => {
      const propsData = {
        required: true,
        rules: { required },
        validate: true,
      }

      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      input.setValue('')

      expect(wrapper.vm.validation.getError()).toBe('Value is required')
    })

    it('should throw correct error message when email input is invalid', () => {
      const propsData = {
        required: true,
        rules: { email },
        validate: true,
      }

      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      input.setValue('test')

      expect(wrapper.vm.validation.getError()).toBe(
        'Value is not a valid email address'
      )
    })

    describe('given an icon', () => {
      it('should render an icon element', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Input, { propsData })
        const iconDom = wrapper.findComponent(Icon)

        expect(iconDom.vm.icon).toBe(propsData.icon)
      })

      it('should set an icon class to the input element', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Input, { propsData })
        const input = wrapper.find('input')

        expect(input.attributes('class')).toMatch('pv-input__element--icon')
      })

      it('should set icon error class when input is invalid', async () => {
        const propsData = {
          icon: 'someIcon',
          required: true,
          rules: { required, email },
          validate: true,
        }
        const wrapper = shallowMount(Input, { propsData })
        const input = wrapper.find('input')

        input.setValue('test')
        await wrapper.vm.$nextTick()

        const errorIcon = wrapper.find('.pv-input__icon--error')
        expect(errorIcon.exists()).toBeTruthy()
        expect(errorIcon.attributes('icon')).toBe('error_outline')
      })
    })
  })

  describe('during interaction', () => {
    it('should emit update event when a key is pressed', () => {
      const value = 'Some Value'
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.setValue(value)

      expect(wrapper.emitted().update.length).toBe(1)
      expect(wrapper.emitted().update[0]).toEqual([value])
    })

    it('should emit an submit event when the enter key is pressed', () => {
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.trigger('keypress.enter')

      expect(wrapper.emitted().submit.length).toBe(1)
    })

    it('should emit an focus event when input was focused', () => {
      const div = document.createElement('div')
      div.id = 'root'
      document.body.appendChild(div)
      const wrapper = shallowMount(Input, { attachTo: '#root' })
      const input = wrapper.find('input')

      input.trigger('focus')

      expect(wrapper.emitted().focus.length).toBe(1)
      expect(wrapper.emitted().focus[0]).toEqual([true])
      wrapper.destroy()
    })

    it('should emit an blur event when input was blurred', () => {
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.trigger('blur')

      expect(wrapper.emitted().focus.length).toBe(1)
      expect(wrapper.emitted().focus[0]).toEqual([false])
    })

    describe('given an icon', () => {
      it('should emit an icon click event when icon was clicked', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Input, { propsData })
        const iconDom = wrapper.findComponent(Icon)

        iconDom.trigger('click')

        expect(wrapper.emitted()['click:icon'].length).toBe(1)
      })
    })
  })
  // describe('business requirements', () => {})
})
