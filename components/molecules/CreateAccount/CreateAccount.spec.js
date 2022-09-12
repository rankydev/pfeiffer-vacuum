import { shallowMount } from '@vue/test-utils'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import Password from '~/components/atoms/FormComponents/Password/Password'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const mockLoadCountries = jest.fn()
jest.mock('~/stores/misc', () => {
  return {
    __esModule: true,
    useMiscStore: () => {
      return {
        loadCountries: mockLoadCountries,
        countries: ['Land1'],
      }
    },
  }
})

const mockLoadRegions = jest.fn(() => {
  mockedRegions.value = ['Region1']
})
const mockedRegions = ref([])
jest.mock('~/composables/useRegions', () => {
  return {
    useRegions: () => {
      return {
        loadRegions: mockLoadRegions,
        regions: mockedRegions,
      }
    },
  }
})

describe('CreateAccount', () => {
  describe('initial state', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should render component correctly', () => {
      const wrapper = shallowMount(CreateAccount)
      const title = wrapper.find('h2')
      const inputArr = wrapper.findAllComponents(PvInput)
      const countrySelection = wrapper.findComponent(FormCountrySelection)
      const password = wrapper.findComponent(Password)

      expect(wrapper.exists()).toBeTruthy()
      expect(title).toBeTruthy()
      expect(inputArr).toHaveLength(4)
      expect(countrySelection).toBeTruthy()
      expect(password).toBeTruthy()
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { validate: true }
      const wrapper = shallowMount(CreateAccount, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
