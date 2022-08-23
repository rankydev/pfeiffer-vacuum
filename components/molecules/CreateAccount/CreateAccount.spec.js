import { createLocalVue, shallowMount } from '@vue/test-utils'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Password from '~/components/atoms/FormComponents/Password/Password'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const localVue = createLocalVue()
localVue.prototype.$nuxt = {
  context: {
    $hybrisApi: {
      countriesApi: {
        getCountries: jest.fn(() => {
          return { then: (i) => i }
        }),
      },
    },
  },
}

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
      const wrapper = shallowMount(CreateAccount, { localVue })
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
      const wrapper = shallowMount(CreateAccount, { propsData, localVue })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
  describe('during interaction', () => {
    it('should return regions array when isocode is provided', async () => {
      const regions = ['Region1']

      const wrapper = shallowMount(CreateAccount, {
        localVue,
      })

      wrapper.setData({
        requestData: {
          registration: {
            company: '',
            address: {
              country: {
                isocode: 'US',
                name: 'United States of America',
              },
              region: {},
            },
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          },
        },
      })

      await wrapper.vm.loadRegions()
      expect(wrapper.vm.regions).toStrictEqual(regions)
    })

    it('should return regions array when appropriate country was selected', async () => {
      const wrapper = shallowMount(CreateAccount, {
        localVue,
      })
      const select = wrapper.findComponent(PvSelect)

      const selectedOption = { isocode: 'US', name: 'United States of America' }
      await select.setData({ internalValue: selectedOption })
      await select.vm.$nextTick()
      await wrapper.vm.$nextTick()

      const allSelects = wrapper.findAllComponents(PvSelect)

      console.log(wrapper.vm.regions)

      //expect(mockLoadRegions).toHaveBeenCalled()
      // expect(allSelects).toHaveLength(2)
    })
  })
})
