import { shallowMount } from '@vue/test-utils'
import Input from './PvInput.vue'
import Icon from '../../Icon/Icon.vue'
import PvLabel from '../partials/PvLabel/PvLabel.vue'
import { expect } from '@jest/globals'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

describe('Input', () => {
  describe('initial state', () => {
    test('should render empty component when no data provided', () => {
      const wrapper = shallowMount(Input)
      const icon = wrapper.findComponent(Icon)
      const input = wrapper.findComponent(Input)
      const label = wrapper.findComponent(PvLabel)

      expect(icon.exists()).toBeFalsy()
      expect(input.exists()).toBeTruthy()
      expect(label.exists()).toBeTruthy()
    })

    test('should set the value to the input when provided', () => {
      const propsData = { value: 'Some Value' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      expect(input.element.value).toBe(propsData.value)
    })

    test('should set a placeholder when provided', () => {
      const propsData = { placeholder: 'Some Placeholder' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')

      expect(input.attributes('placeholder')).toBe(propsData.placeholder)
    })

    test('should disable input when disabled is set to true', () => {
      const propsData = { disabled: true }
      const wrapper = shallowMount(Input, { propsData })
      const inputWrapper = wrapper.find('.pv-input__element')

      expect(inputWrapper.attributes('disabled')).toBeTruthy()
      expect(inputWrapper.attributes('required')).toBeFalsy()
    })

    test('should set a label when provided', () => {
      const propsData = { label: 'Some Label' }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.findComponent(PvLabel)

      expect(input.attributes('label')).toBe(propsData.label)
    })

    test('should set error class on input element when validation throws error', async () => {
      const propsData = {
        required: true,
        rules: { required, email },
      }
      const wrapper = shallowMount(Input, { propsData })

      const input = wrapper.find('input')
      input.setValue('test')
      await wrapper.vm.$nextTick()

      expect(input.classes()).toContain('pv-input__element--error')
    })

    test('should throw correct error message when required input is not set', async () => {
      const propsData = {
        required: true,
        rules: { required },
      }

      const wrapper = shallowMount(Input, { propsData })

      const input = wrapper.find('input')
      input.setValue('')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.validation.getError()).toBe('Value is required')
    })

    test('should throw correct error message when email input is invalid', async () => {
      const propsData = {
        required: true,
        rules: { email },
        value: 'abc',
      }

      const wrapper = shallowMount(Input, { propsData })

      const input = wrapper.find('input')
      input.setValue('test')
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.validation.getError()).toBe(
        'Value is not a valid email address'
      )
    })

    describe('given an icon', () => {
      test('should render an icon element', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Input, { propsData })
        const iconDom = wrapper.findComponent(Icon)

        expect(iconDom.vm.icon).toBe(propsData.icon)
      })

      test('should set an icon class to the input element', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Input, { propsData })
        const input = wrapper.find('input')

        expect(input.attributes('class')).toMatch('pv-input__element--icon')
      })

      test('should set icon error class when input is invalid', async () => {
        const propsData = {
          icon: 'someIcon',
          required: true,
          rules: { required, email },
          value: 'test',
        }
        const wrapper = shallowMount(Input, { propsData })
        const input = wrapper.find('input')

        input.trigger('input')
        await wrapper.vm.$nextTick()

        const errorIcon = wrapper.find('.pv-input__icon--error')
        expect(errorIcon.exists()).toBeTruthy()
        expect(errorIcon.attributes('icon')).toBe('error_outline')
      })
    })
  })

  describe('during interaction', () => {
    test('should emit input event when a key is pressed', async () => {
      const propsData = {
        value: 'Some Value',
      }
      const wrapper = shallowMount(Input, { propsData })
      const input = wrapper.find('input')
      input.trigger('input')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().input.length).toBe(1)
      expect(wrapper.emitted().input[0]).toEqual([propsData.value])
    })

    test('should emit an submit event when the enter key is pressed', () => {
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.trigger('keypress.enter')

      expect(wrapper.emitted().submit.length).toBe(1)
    })

    test('should emit an focus event when input was focused', () => {
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

    test('should emit an blur event when input was blurred', () => {
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.trigger('blur')

      expect(wrapper.emitted().focus.length).toBe(1)
      expect(wrapper.emitted().focus[0]).toEqual([false])
    })

    describe('given an icon', () => {
      test('should emit an icon click event when icon was clicked', () => {
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
