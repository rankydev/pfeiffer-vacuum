import { expect } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import GenericModal from './GenericModal.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

describe('GenericModal', () => {
  describe('initial state', () => {
    test('should render given no props', () => {
      const wrapper = shallowMount(GenericModal)
      expect(wrapper.find('.modal').exists()).toBeFalsy()
    })

    test('should render given isOpen prop = true', () => {
      const wrapper = shallowMount(GenericModal, {
        propsData: { isOpen: true },
      })
      expect(wrapper.find('.modal').exists()).toBeTruthy()
    })
  })
  describe('during interaction', () => {
    test('should emit close event on icon click', async () => {
      const wrapper = shallowMount(GenericModal, {
        propsData: { isOpen: true },
      })
      const mockEmit = jest.fn()
      wrapper.vm.$emit = mockEmit
      const icon = wrapper.findComponent(Icon)
      await icon.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(mockEmit).toBeCalledWith('closeModal')
    })
  })
})
