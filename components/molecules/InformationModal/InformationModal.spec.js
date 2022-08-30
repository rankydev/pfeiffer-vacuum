import { expect } from '@jest/globals'
import { shallowMount } from '@vue/test-utils'
import InformationModal from './InformationModal.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Button from '~/components/atoms/Button/Button.vue'

describe('InformationModal', () => {
  const propsData = {
    isOpen: true,
    headline: 'Your personal Price',
    text: '<p>Plain text can be added <u>also with underline</u> or <strong>strong</strong></p>',
  }
  describe('initial state', () => {
    test('should render given no props', () => {
      const wrapper = shallowMount(InformationModal)
      expect(wrapper.find('.information-modal').exists()).toBeTruthy()
    })

    test('should render given props', () => {
      const wrapper = shallowMount(InformationModal, {
        propsData,
      })
      const headline = wrapper.find('.information-modal__headline')
      const text = wrapper.findComponent(Richtext)
      const btn = wrapper.findComponent(Button)
      expect(headline.text()).toBe(propsData.headline)
      expect(text.attributes('richtext')).toBe(propsData.text)
      expect(btn.exists()).toBeTruthy()
    })
  })
  describe('during interaction', () => {})
})
