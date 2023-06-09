import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect.vue'
import { icon, label, normal, error } from './PvSelect.stories.content'
import { shallowMount } from '@vue/test-utils'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import Icon from '~/components/atoms/Icon/Icon'

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
      const labelWrapper = wrapper.findComponent(PvLabel)

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

    describe('during interaction', () => {
      it('should return error when selected option is invalid', async () => {
        const propsData = {
          ...error,
        }
        createComponent(propsData)
        wrapper.vm.validation.validateInput()

        expect(wrapper.vm.validation.getError()).toBe('Value is required')
      })
    })
  })
  // describe('business requirements', () => {})
})
