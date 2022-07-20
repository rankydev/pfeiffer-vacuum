import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect.vue'
import { icon, label, normal, error } from './PvSelect.stories.content'
import { shallowMount } from '@vue/test-utils'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'
import errorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import Icon from '~/components/atoms/Icon/Icon'
import { describe, expect, it } from '@jest/globals'

let wrapper

function createComponent(propsData = {}, {} = {}) {
  const vSelect = {
    props: [
      'options',
      'label',
      'placeholder',
      'disabled',
      'selectable',
      'components',
      'reduce',
    ],
    template: `<div class="v-select">
      <div class="search"><slot name="search"  v-bind="{ attributes: {}, events: {}}"/></div>
      <div class="open-indicator"><slot name="open-indicator" /></div>
      <div class="option"><slot name="option" v-bind="options[0]" /></div>
      <div class="selected-option"><slot name="selected-option" v-bind="options[0]" /></div>
      <div class="no-options"><slot name="no-options" /></div>
    </div>`,
  }

  const options = {
    stubs: { vSelect },
    propsData,
  }

  wrapper = shallowMount(PvSelect, options)
}

describe('Select', () => {
  describe('initial state', () => {
    it('should render label component correctly given as a prop', () => {
      const propsData = { ...label }
      createComponent(propsData)
      const labelWrapper = wrapper.findComponent(Label)

      expect(labelWrapper.attributes('label')).toBe(propsData.label)
    })

    describe('given an options object', () => {
      it('should be prepend an icon given one within the options object', () => {
        const propsData = { ...icon }
        createComponent(propsData)
        const search = wrapper.find('.search')
        const prependIcon = search.findComponent(Icon)

        expect(prependIcon.exists()).toBeTruthy()
        expect(prependIcon.vm.icon).toBe(propsData.prependIcon)
      })
      it('should use the optionLabel given a custom one', () => {
        const propsData = { ...normal }
        createComponent(propsData)
        const labelWrapper = wrapper.find('span')

        expect(propsData.optionLabel).toBe('displayValue')
        expect(labelWrapper.text()).toBe(propsData.options[0].displayValue)
      })
    })

    describe('given an prependIcon', () => {
      it('should set the correct class on v-select', () => {
        const propsData = { ...icon }
        createComponent(propsData)
        const selectWrapper = wrapper.find('.v-select')

        expect(selectWrapper.attributes('class')).toMatch('pv-select--icon')
      })
    })

    describe('given an error', () => {
      const propsData = { ...error }

      it('should add the correct error class on v-select', () => {
        createComponent(propsData)
        const selectWrapper = wrapper.find('.v-select')

        expect(selectWrapper.attributes('class')).toMatch('pv-select--error')
      })

      it('should render an error message component', () => {
        createComponent(propsData)

        const input = wrapper.findComponent(errorMessage)
        expect(input.attributes('errormessage')).toBe(propsData.errorMessage)
      })
    })
  })

  describe('during interaction', () => {
    it('should emit an update event when innerValue has changed', async () => {
      const value = 'Some Value'
      const propsData = { ...normal }
      createComponent(propsData)

      const emitMock = jest.fn()
      wrapper.vm.$emit = emitMock
      await wrapper.setData({ innerValue: value })
      expect(emitMock).toBeCalledTimes(1)
      expect(emitMock).toBeCalledWith('update', value)
    })
  })

  // describe('business requirements', () => {})
})
