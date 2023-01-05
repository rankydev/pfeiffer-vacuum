import RegistrationPageDataProtection from './RegistrationPageDataProtection'
import { shallowMount } from '@vue/test-utils'
import { reactive } from '@nuxtjs/composition-api'
import { createPinia, setActivePinia } from 'pinia'

const mockedLinks = reactive({})
jest.mock('~/stores/datasources', () => {
  return {
    useDatasourcesStore: () => {
      return {
        loadLinksFromDatasource: () => {
          return (mockedLinks['personalPrivacyLink'] = 'testLink')
        },
      }
    },
  }
})

describe('RegistrationPageDataProtection', () => {
  describe('initial state', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should render', () => {
      const wrapper = shallowMount(RegistrationPageDataProtection)

      const component = wrapper.find('.registration-page-data-protection')

      expect(component.exists()).toBeTruthy()
    })
  })
})
