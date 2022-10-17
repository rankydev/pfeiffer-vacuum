import HintModal from './HintModal'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import Button from '~/components/atoms/Button/Button'
import Link from '~/components/atoms/Link/Link'

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

  describe('during interaction', () => {
    test('should emit closeModal event with true when proceed-button is clicked', async () => {
      const wrapper = shallowMount(HintModal, {
        propsData: { isOpen: true },
      })

      const button = wrapper.findComponent(Button)
      button.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().closeModal.length).toBe(1)
      expect(wrapper.emitted().closeModal[0][0]).toEqual({
        proceedWithoutCompany: true,
      })
    })

    test('should emit closeModal event with val false when link is clicked', async () => {
      const wrapper = shallowMount(HintModal, {
        propsData: { isOpen: true },
      })

      const link = wrapper.findComponent(Link)
      const button = link.findComponent(Button)
      button.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().closeModal.length).toBe(1)
      expect(wrapper.emitted().closeModal[0][0]).toEqual({
        proceedWithoutCompany: false,
      })
    })
  })
})
