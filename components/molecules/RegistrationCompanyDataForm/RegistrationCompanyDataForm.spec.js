import { createLocalVue, shallowMount } from '@vue/test-utils'
import RegistrationCompanyDataForm from '~/components/molecules/RegistrationCompanyDataForm/RegistrationCompanyDataForm'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import Infobox from '~/components/molecules/Infobox/Infobox'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const localVue = createLocalVue()

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

describe('RegistrationCompanyDataForm', () => {
  describe('initial state', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should render component correctly, hide form initially', () => {
      const wrapper = shallowMount(RegistrationCompanyDataForm, {
        localVue,
      })

      const headline = wrapper.find('h2')
      const inputFields = wrapper.findAllComponents(PvInput)
      const countrySelection = wrapper.findComponent(FormCountrySelection)
      const buttonGroup = wrapper.findComponent(ButtonGroup)
      const infobox = wrapper.findComponent(Infobox)
      const removeBtn = wrapper.find(
        '.registration-company-data-form__remove-button'
      )
      const addBtn = wrapper.find('.registration-company-data-form__add-button')

      expect(wrapper.exists()).toBeTruthy()
      expect(headline.exists()).toBeTruthy()
      expect(addBtn.exists()).toBeTruthy()
      expect(infobox.exists()).toBeTruthy()

      expect(inputFields).toHaveLength(0)
      expect(countrySelection.exists()).toBeFalsy()
      expect(buttonGroup.exists()).toBeFalsy()
      expect(removeBtn.exists()).toBeFalsy()
    })

    test('should show form, when addCompany is true', async () => {
      const wrapper = shallowMount(RegistrationCompanyDataForm, {
        localVue,
      })
      wrapper.vm.addCompany = true
      await wrapper.vm.$nextTick()

      const headline = wrapper.find('h2')
      const inputFields = wrapper.findAllComponents(PvInput)
      const countrySelection = wrapper.findComponent(FormCountrySelection)
      const buttonGroup = wrapper.findComponent(ButtonGroup)
      const infobox = wrapper.findComponent(Infobox)
      const removeBtn = wrapper.find(
        '.registration-company-data-form__remove-button'
      )
      const addBtn = wrapper.find('.registration-company-data-form__add-button')

      expect(wrapper.exists()).toBeTruthy()
      expect(headline.exists()).toBeTruthy()
      expect(addBtn.exists()).toBeFalsy()
      expect(infobox.exists()).toBeTruthy()

      expect(inputFields).toHaveLength(10)
      expect(countrySelection.exists()).toBeTruthy()
      expect(buttonGroup.exists()).toBeTruthy()
      expect(removeBtn.exists()).toBeTruthy()
    })

    test('should validate input fields given validate', () => {
      const propsData = { validate: true }
      const wrapper = shallowMount(RegistrationCompanyDataForm, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
