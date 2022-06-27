import { shallowMount } from '@vue/test-utils'
import Input from './InputField.vue'
import Icon from '../Icon/Icon.vue'

describe('Input', () => {
  describe('initial state', () => {
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
    })
  })

  describe('during interaction', () => {
    it('should emit an change event when a key is pressed', () => {
      const value = 'Some Value'
      const wrapper = shallowMount(Input)
      const input = wrapper.find('input')

      input.setValue(value)

      expect(wrapper.emitted().change.length).toBe(1)
      expect(wrapper.emitted().change[0]).toEqual([value])
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
