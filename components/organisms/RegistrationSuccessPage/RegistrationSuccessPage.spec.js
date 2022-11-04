import RegistrationSuccessPage from './RegistrationSuccessPage'
import { shallowMount } from '@vue/test-utils'

describe('RegistrationSuccessPage', () => {
  describe('initial state', () => {
    test('should render', () => {
      const wrapper = shallowMount(RegistrationSuccessPage)

      const component = wrapper.find('.registration-success-page')

      expect(component.exists()).toBeTruthy()
    })
  })
})
