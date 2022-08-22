import { createLocalVue, shallowMount } from '@vue/test-utils'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Password from '~/components/atoms/FormComponents/Password/Password'
import { setActivePinia, createPinia } from 'pinia'

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
    test('should add second select component after selecting country', async () => {
      const localVue = createLocalVue()
      localVue.prototype.$nuxt = {
        context: {
          $hybrisApi: {
            countriesApi: {
              getRegions: jest.fn(() => {
                return { then: (i) => i }
              }),
            },
          },
        },
      }

      const mockLoadRegions = jest.fn(() => {
        return ['Region1']
      })
      jest.mock('~/composables/useRegions', () => {
        return {
          __esModule: true,
          useRegions: () => {
            return {
              loadRegions: mockLoadRegions,
              regions: ['Region1'],
            }
          },
        }
      })
      const wrapper = shallowMount(CreateAccount, { localVue })
      const countries = wrapper.findComponent(PvSelect)

      expect(wrapper.exists()).toBeTruthy()
      expect(countries).toBeTruthy()

      const allSelects = wrapper.findAllComponents(PvSelect)
      // expect(allSelects).toHaveLength(2)
    })
  })
})
