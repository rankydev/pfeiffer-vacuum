import { shallowMount } from '@vue/test-utils'
import Password from './Password.vue'
import Icon from '../../Icon/Icon.vue'
import PvLabel from '../partials/PvLabel/PvLabel.vue'
import { expect } from '@jest/globals'
import { required } from '@vuelidate/validators'

describe('Password', () => {
  describe('initial state', () => {
    it('should render empty component when no data provided', () => {
      const wrapper = shallowMount(Password)
      const icon = wrapper.findComponent(Icon)
      const input = wrapper.findComponent(Password)
      const label = wrapper.findComponent(PvLabel)

      expect(icon.exists()).toBeTruthy()
      expect(input.exists()).toBeTruthy()
      expect(label.exists()).toBeTruthy()
    })

    it('should set the value to the input when provided', () => {
      const propsData = { value: 'Some Value' }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      expect(input.element.value).toBe(propsData.value)
    })

    it('should set a placeholder when provided', () => {
      const propsData = { placeholder: 'Some Placeholder' }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      expect(input.attributes('placeholder')).toBe(propsData.placeholder)
    })

    it('should make password visible when visible is set to true', () => {
      const propsData = { visibility: true }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      expect(input.attributes('type')).toBe('text')
    })

    it('should disable input when disabled is set to true', () => {
      const propsData = { disabled: true }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      expect(input.attributes('disabled')).toBeTruthy()
      expect(input.attributes('required')).toBeFalsy()
    })

    it('should set a label when provided', () => {
      const propsData = { label: 'Some Label' }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.findComponent(PvLabel)

      expect(input.attributes('label')).toBe(propsData.label)
    })

    it('should set error class on input element when validation throws error', async () => {
      const propsData = {
        required: true,
        rules: { required },
        validate: true,
      }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      input.setValue('')
      await wrapper.vm.$nextTick()

      expect(
        wrapper.find('.pv-password__element--vuelidated').exists()
      ).toBeTruthy()
    })

    it('should throw correct error message when required input is not set yet', () => {
      const propsData = {
        required: true,
        rules: { required },
        validate: true,
      }

      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')

      input.setValue('')

      expect(wrapper.vm.validation.getError()).toBe('Value is required')
    })

    it('should render criterias given prop validate with value true', () => {
      const propsData = { showValidationCriterias: true }
      const wrapper = shallowMount(Password, { propsData })
      const passwordCriterias = wrapper.find('.pv-password__rules')

      expect(passwordCriterias.exists()).toBeTruthy()
    })

    it('should add class fulfilled to criterias given valid password', () => {
      const propsData = { showValidationCriterias: true, value: 'Aas12esd' }
      const wrapper = shallowMount(Password, { propsData })
      const passwordCriterias = wrapper.findAll('.fulfilled')

      expect(passwordCriterias.length).toBe(3)
    })
  })

  describe('during interaction', () => {
    it('should emit update event when a key is pressed', () => {
      const value = 'Some Value'
      const wrapper = shallowMount(Password)
      const input = wrapper.find('input')

      input.setValue(value)

      expect(wrapper.emitted().update.length).toBe(1)
      expect(wrapper.emitted().update[0]).toEqual([value])
    })

    it('should emit an submit event when the enter key is pressed', () => {
      const wrapper = shallowMount(Password)
      const input = wrapper.find('input')

      input.trigger('keypress.enter')

      expect(wrapper.emitted().submit.length).toBe(1)
    })

    it('should emit an focus event when input was focused', () => {
      const div = document.createElement('div')
      div.id = 'root'
      document.body.appendChild(div)
      const wrapper = shallowMount(Password, { attachTo: '#root' })
      const input = wrapper.find('input')

      input.trigger('focus')

      expect(wrapper.emitted().focus.length).toBe(1)
      expect(wrapper.emitted().focus[0]).toEqual([true])
      wrapper.destroy()
    })

    it('should emit an blur event when input was blurred', () => {
      const wrapper = shallowMount(Password)
      const input = wrapper.find('input')

      input.trigger('blur')

      expect(wrapper.emitted().focus.length).toBe(1)
      expect(wrapper.emitted().focus[0]).toEqual([false])
    })

    it('should emit an icon click event when icon was clicked', async () => {
      const propsData = { visibility: false }
      const wrapper = shallowMount(Password, { propsData })
      const input = wrapper.find('input')
      const iconDom = wrapper.find('.pv-password__icon--visibility')

      iconDom.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted()['click:icon'].length).toBe(1)
      expect(input.attributes('type')).toBe('text')
    })
  })
})
