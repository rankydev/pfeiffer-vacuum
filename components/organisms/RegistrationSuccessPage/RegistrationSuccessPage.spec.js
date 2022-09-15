import RegistrationSuccessPage from './RegistrationSuccessPage'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

describe('RegistrationSuccessPage', () => {
  describe('initial state', () => {
    test('should render', () => {
      const wrapper = shallowMount(RegistrationSuccessPage)

      const component = wrapper.find('.registration-success-page')

      expect(component.exists()).toBeTruthy()
    })
  })
})
