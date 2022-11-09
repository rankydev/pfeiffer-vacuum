import RegistrationSuccessPage from './RegistrationSuccessPage'
import { shallowMount } from '@vue/test-utils'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(() => ({
      value: { query: {} },
    })),
  }
})

describe('RegistrationSuccessPage', () => {
  describe('initial state', () => {
    test('should render', () => {
      const wrapper = shallowMount(RegistrationSuccessPage)

      const component = wrapper.find('.registration-success-page')

      expect(component.exists()).toBeTruthy()
    })
  })
})
