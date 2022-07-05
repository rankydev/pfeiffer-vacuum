import { shallowMount } from '@vue/test-utils'
import ErrorMessage from './ErrorMessage.vue'
import { expect } from '@jest/globals'

describe('Input', () => {
  describe('initial state', () => {
    it('should render empty component when no data provided', () => {
      const wrapper = shallowMount(ErrorMessage)
      const errorMsg = wrapper.find('.error-message')
      expect(errorMsg.exists()).toBeTruthy()
    })

    it('should set an error message when provided', () => {
      const propsData = { errorMessage: 'Some error occured' }
      const wrapper = shallowMount(ErrorMessage, { propsData })
      const errorMsg = wrapper.find('.error-message')

      expect(errorMsg.text()).toBe(propsData.errorMessage)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
