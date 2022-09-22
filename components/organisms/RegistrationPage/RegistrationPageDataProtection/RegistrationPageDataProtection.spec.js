import RegistrationPageDataProtection from './RegistrationPageDataProtection'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

describe('RegistrationPageDataProtection', () => {
  describe('initial state', () => {
    test('should render', () => {
      const wrapper = shallowMount(RegistrationPageDataProtection)

      const component = wrapper.find('.registration-page-data-protection')

      expect(component.exists()).toBeTruthy()
    })
  })
})
