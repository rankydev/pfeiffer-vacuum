import TextArea from './TextArea.vue'
import { shallowMount } from '@vue/test-utils'

describe('TextArea', () => {
  describe('initial state', () => {
    test('should be rendered correctly', () => {
      const propsData = {}
      const wrapper = shallowMount(TextArea, { propsData })
      const textarea = wrapper.find('textarea')

      expect(textarea.element).toBeTruthy()
    })
  })
})
