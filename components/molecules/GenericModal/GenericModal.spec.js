import { expect } from '@jest/globals'
import { shallowMount, mount } from '@vue/test-utils'
import GenericModal from './GenericModal.vue'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import Icon from '~/components/atoms/Icon/Icon.vue'

const propsData = {
  isOpen: true,
  headline: 'Your personal Price',
  text: '<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong></p>',
}

describe('GenericModal', () => {
  describe('initial state', () => {
    test('should render given no props', () => {
      const wrapper = shallowMount(GenericModal)
      // const wrapper = shallowMount(GenericModal)
      expect(wrapper.find('.modal').exists()).toBeFalsy()
    })

    test('should render given isOpen prop = true', () => {
      const wrapper = shallowMount(GenericModal, {
        propsData,
        stub: {
          ContentWrapper: true,
        },
      })
      expect(wrapper.find('.modal').exists()).toBeTruthy()
    })
  })
  describe('during interaction', () => {
    test('should emit close event on icon click', async () => {
      const wrapper = shallowMount(GenericModal, {
        propsData,
        stub: {
          ContentWrapper: true,
        },
      })
      const mockEmit = jest.fn()
      wrapper.vm.$emit = mockEmit
      const icon = wrapper.findComponent(Icon)
      await icon.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(mockEmit).toBeCalledWith('closeModal')
    })
    test('should emit close event on ESC key', async () => {
      const wrapper = mount(GenericModal, {
        propsData: {
          isOpen: false,
        },
        attachTo: document.body,
        stub: {
          ContentWrapper: true,
        },
      })
      const mockEmit = jest.fn()
      wrapper.vm.$emit = mockEmit

      wrapper.setProps({ isOpen: true })
      await wrapper.vm.$nextTick()

      await wrapper.trigger('keyup.esc')
      await wrapper.vm.$nextTick()

      expect(mockEmit).toBeCalledWith('closeModal')
    })
    test('should emit close event on background click', async () => {
      const wrapper = mount(GenericModal, {
        propsData: {
          isOpen: false,
        },
        attachTo: document.body,
        stub: {
          ContentWrapper: true,
        },
      })
      const mockEmit = jest.fn()
      wrapper.vm.$emit = mockEmit

      wrapper.setProps({ isOpen: true })
      await wrapper.vm.$nextTick()
      const background = wrapper.find('.modal__background')
      await background.trigger('click')
      await wrapper.vm.$nextTick()
      expect(mockEmit).toBeCalledWith('closeModal')
    })
  })
})
