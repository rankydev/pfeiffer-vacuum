import RegistrationPage from './RegistrationPage'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HintModal from '~/components/organisms/RegistrationPage/HintModal/HintModal'
import { reactive, ref, useRoute } from '@nuxtjs/composition-api'

const requestData = {
  personalData: {
    companyName: 'Test GmbH',
    address: {
      country: { isocode: 'US', name: 'Vereinigte Staaten von Amerika' },
      region: { isocode: 'US-AK', name: 'Alaska' },
    },
    firstName: 'First',
    lastName: 'Last',
    email: 'daniela.hofmann@diva-e.com',
    password: '#Test123',
  },
  companyData: {
    companyAlreadyCustomer: false,
    companyUid: '',
    companyFurtherDetails: 'additional',
    department: 'department',
    companyVatId: 'vat id',
    phone: '+4915111111111',
    fax: '',
    companyAddressStreet: 'Barfußgäßchen',
    companyAddressStreetLine2: '11',
    companyAddressPostalCode: '04109',
    companyAddressTown: 'Leipzig',
  },
}

const mockRouterPush = jest.fn()
jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(),
    useRouter: () => ({
      push: mockRouterPush,
    }),
    useContext: () => ({
      localePath: (path) => `/test${path}`,
      i18n: {
        t: (key) => key,
      },
    }),
  }
})

const mockRegister = jest.fn()
jest.mock('~/stores/user', () => {
  return {
    useUserStore: () => {
      return { register: mockRegister, login: jest.fn() }
    },
  }
})

const mockToastError = jest.fn()
jest.mock('~/composables/useToast', () => {
  return {
    useToast: () => {
      return { error: mockToastError }
    },
  }
})

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

describe('RegistrationPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.resetAllMocks()
  })

  describe('initial state', () => {
    useRoute.mockImplementation(() => ref({ query: { isLoginProcess: false } }))
    test('should render', () => {
      const wrapper = shallowMount(RegistrationPage)

      const component = wrapper.find('.registration-page')

      expect(component.exists()).toBeTruthy()
    })
  })

  describe('during interaction', () => {
    test('should show modal when submit btn is clicked', async () => {
      const wrapper = shallowMount(RegistrationPage)

      const spyTriggerSendRegistrationProcess = jest.spyOn(
        wrapper.vm,
        'triggerSendRegistrationProcess'
      )
      const submitButton = wrapper.find(
        '.registration-page__form-section__submit-button'
      )

      submitButton.trigger('click')
      await wrapper.vm.$nextTick()
      const modal = wrapper.findComponent(HintModal)

      expect(spyTriggerSendRegistrationProcess).toHaveBeenCalled()
      expect(wrapper.vm.proceedWithoutCompany).toBeFalsy()
      expect(wrapper.vm.modalIsOpen).toBeTruthy()
      expect(modal.vm.isOpen).toBeTruthy()
    })

    test('should call register given requestData', async () => {
      const wrapper = shallowMount(RegistrationPage)
      mockRegister.mockReturnValue(Promise.resolve())
      await wrapper.setData({
        proceedWithoutCompany: true,
        requestData: requestData,
      })
      const submitButton = wrapper.find(
        '.registration-page__form-section__submit-button'
      )
      submitButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(mockRegister).toBeCalledTimes(1)
      expect(mockToastError).toBeCalledTimes(0)
      expect(mockRouterPush).toBeCalledWith(
        '/test/shop/register/success?type=lite'
      )
    })

    test('should fail register given already existing customer', async () => {
      const wrapper = shallowMount(RegistrationPage)
      mockRegister.mockReturnValue(
        Promise.reject({
          data: { errors: [{ type: 'CustomerAlreadyExistsError' }] },
        })
      )

      mockToastError.mockImplementation((message) => {
        expect(message).toStrictEqual({
          description: 'form.message.error.customerAlreadyExists',
        })
      })

      await wrapper.setData({
        proceedWithoutCompany: true,
        requestData: requestData,
      })
      const submitButton = wrapper.find(
        '.registration-page__form-section__submit-button'
      )
      submitButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(mockRegister).toBeCalledTimes(1)
    })
  })
})
