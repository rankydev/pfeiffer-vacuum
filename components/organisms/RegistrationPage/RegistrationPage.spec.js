import RegistrationPage from './RegistrationPage'
import { shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'

describe('RegistrationPage', () => {
  describe('initial state', () => {
    test('should render', () => {
      const wrapper = shallowMount(RegistrationPage)

      const component = wrapper.find('.registration-page')

      expect(component.exists()).toBeTruthy()
    })
  })
})
