import HintModal from './HintModal'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

describe('HintModal', () => {
  describe('initial state', () => {
    test('should render when isOpen is true', () => {
      const wrapper = shallowMount(HintModal, {
        propsData: { isOpen: true },
      })

      const component = wrapper.find('.hint-modal')

      expect(component.exists()).toBeTruthy()
    })

    test('should not render when isOpen is true', () => {
      const wrapper = shallowMount(HintModal, {
        propsData: { isOpen: false },
      })

      const component = wrapper.find('.modal')

      expect(component.exists()).toBeFalsy()
    })
  })
})
