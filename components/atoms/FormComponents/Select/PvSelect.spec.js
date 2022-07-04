import PvSelect from '~/components/atoms/FormComponents/Select/PvSelect.vue'
import { normal, error, label } from './PvSelect.stories.content'
import { shallowMount } from '@vue/test-utils'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'
import errorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import { expect } from '@jest/globals'

describe('Select', () => {
  describe('initial state', () => {
    test('should be rendered correctly given props', () => {
      const propsData = { ...normal }
      const wrapper = shallowMount(PvSelect, { propsData })
      const selectWrapper = wrapper.find('.pv-select')

      expect(selectWrapper.exists()).toBeTruthy()
    })
    test('should render label component correctly given props', () => {
      const propsData = { ...label }
      const wrapper = shallowMount(PvSelect, { propsData })
      const labelWrapper = wrapper.findComponent(Label)

      expect(labelWrapper.attributes('label')).toBe(propsData.label)
    })
    it('should set an error message when provided', () => {
      const propsData = { ...error }
      const wrapper = shallowMount(PvSelect, { propsData })
      const input = wrapper.findComponent(errorMessage)

      expect(input.attributes('errormessage')).toBe(propsData.errorMessage)
    })
  })
})
