import PvSelect from '~/components/atoms/FormComponents/Select/PvSelect.vue'
import content from './PvSelect.stories.content'
import { shallowMount } from '@vue/test-utils'

const propsSelect = {
  ...content,
}

describe('Select', () => {
  describe('initial state', () => {
    test('should be rendered correctly given props', () => {
      const propsData = { ...content }
      const wrapper = shallowMount(PvSelect, { propsData })
      const selectWrapper = wrapper.find('.pv-select')

      expect(selectWrapper.exists()).toBeTruthy()
    })
  })
})
