import Label from './Label.vue'
import { shallowMount } from '@vue/test-utils'

const propsLabel = {
  label: 'Test',
}

describe('Label', () => {
  describe('initial state', () => {
    const propsData = { ...propsLabel }
    const wrapper = shallowMount(Label, { propsData })

    test('should be rendered correctly given props', () => {
      const labelWrapper = wrapper.find('label')

      expect(labelWrapper.exists()).toBeTruthy()
    })
    test('should render labels correctly given prop label', () => {
      const propsData = { ...propsLabel }
      const wrapper = shallowMount(Label, { propsData })
      const labelWrapper = wrapper.findAll('span')

      expect(labelWrapper.at(0).text()).toBe('Test')
      expect(labelWrapper).toHaveLength(1)
    })
    test('should render labels correctly given props label, optional, disabled', () => {
      const propsData = {
        label: 'Test',
        optional: true,
        disabled: true,
      }
      const wrapper = shallowMount(Label, { propsData })
      const labelWrapper = wrapper.findAll('span')

      expect(labelWrapper.at(0).text()).toBe('Test')
      expect(labelWrapper.at(1).text()).toBe('form.label.optional')
    })
  })
})
