import { shallowMount } from '@vue/test-utils'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Password from '~/components/atoms/FormComponents/Password/Password'
import { setActivePinia, createPinia } from 'pinia'
import { reactive } from '@nuxtjs/composition-api'

const mockLoadCountries = jest.fn()
const mockLoadRegions = jest.fn((isoCode) => {
  mockedRegions[isoCode] = ['Region1']
})
const mockedRegions = reactive({})
jest.mock('~/stores/countries', () => {
  return {
    __esModule: true,
    useCountriesStore: () => {
      return {
        loadCountries: mockLoadCountries,
        countries: ['Land1'],
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
      const select = wrapper.findComponent(PvSelect)
      const password = wrapper.findComponent(Password)

      expect(wrapper.exists()).toBeTruthy()
      expect(title).toBeTruthy()
      expect(inputArr).toHaveLength(4)
      expect(select).toBeTruthy()
      expect(password).toBeTruthy()
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { validate: true }
      const wrapper = shallowMount(CreateAccount, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
  describe('during interaction', () => {
    it('should return regions array when appropriate country was selected', async () => {
      const wrapper = shallowMount(CreateAccount)
      const select = wrapper.findComponent(PvSelect)

      const selectedOption = {
        isocode: 'US',
        name: 'United States of America',
      }
      select.vm.$emit('update', selectedOption)
      await select.vm.$nextTick()
      const allSelects = wrapper.findAllComponents(PvSelect)

      expect(mockLoadRegions).toHaveBeenCalled()
      expect(allSelects).toHaveLength(2)
    })
  })
})
