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
      const labelWrapper = wrapper.find('div')

      expect(labelWrapper.exists()).toBeTruthy()
    })
  })
})
