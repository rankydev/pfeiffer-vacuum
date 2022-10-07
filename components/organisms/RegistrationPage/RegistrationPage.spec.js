import RegistrationPage from './RegistrationPage'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import { setActivePinia, createPinia } from 'pinia'
import HintModal from '~/components/organisms/RegistrationPage/HintModal/HintModal'
import { ref, useRoute } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

const create = {
  setBaseURL: jest.fn(),
  setHeader: jest.fn(),
}

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

const badRequestData = {
  ...requestData,
  companyData: { companyAlreadyCustomer: undefined },
}

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useRoute: jest.fn(),
  }
})
const mockRegister = jest.fn()
jest.mock('~/stores/user', () => {
  return {
    useUserStore: () => {
      return { register: mockRegister }
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

const localVue = createLocalVue()
localVue.prototype.$nuxt = {
  context: {
    $axios: {
      create: jest.fn(() => create),
    },
    i18n: {
      t: () => 'some specific text',
    },
  },
}

describe('RegistrationPage', () => {
  describe('initial state', () => {
    useRoute.mockImplementation(() => ref({ query: { isLoginProcess: false } }))
    beforeEach(() => setActivePinia(createPinia()))
    test('should render', () => {
      const wrapper = shallowMount(RegistrationPage, {
        localVue,
      })

      const component = wrapper.find('.registration-page')

      expect(component.exists()).toBeTruthy()
    })
  })

  describe('during interaction', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should show modal when submit btn is clicked', async () => {
      const wrapper = shallowMount(RegistrationPage, {
        localVue,
      })

      //mockRegister.mockImplementation()
      //mockRegister.mockReturnValueOnce() nur einmal wert zurückgeben

      const spyTriggerSendRegistrationProcess = jest.spyOn(
        wrapper.vm,
        'triggerSendRegistrationProcess'
      )
      const submitButton = wrapper.find(
        '.registration-page__form-section__submit-button'
      )

      submitButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(spyTriggerSendRegistrationProcess).toHaveBeenCalled()
      expect(wrapper.vm.proceedWithoutCompany).toBeFalsy()
      expect(wrapper.vm.validate).toBeFalsy()
      expect(wrapper.vm.modalIsOpen).toBeTruthy()

      const modal = wrapper.findComponent(HintModal)
      expect(modal.vm.isOpen).toBeTruthy()
    })

    test('should call register given requestData', async () => {
      const wrapper = shallowMount(RegistrationPage, {
        localVue,
      })
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
    })

    test('should not call register given wrong requestData', async () => {
      const wrapper = shallowMount(RegistrationPage, {
        localVue,
      })
      mockRegister.mockReturnValue(Promise.resolve())
      await wrapper.setData({
        proceedWithoutCompany: true,
        requestData: badRequestData,
      })
      const submitButton = wrapper.find(
        '.registration-page__form-section__submit-button'
      )
      submitButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect(mockRegister).toBeCalled()
      expect(mockToastError).toBeCalledTimes(1)
    })
  })
})
