import RegistrationPage from './RegistrationPage'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { expect } from '@jest/globals'
import { setActivePinia, createPinia } from 'pinia'
import HintModal from '~/components/organisms/RegistrationPage/HintModal/HintModal'

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
    i18n: {
      t: () => 'some specific text',
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

describe('RegistrationPage', () => {
  describe('initial state', () => {
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
  })
})
