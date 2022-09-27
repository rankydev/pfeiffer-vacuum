import { shallowMount } from '@vue/test-utils'
import ContactRequestForm from '~/components/molecules/ContactRequestForm/ContactRequestForm'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button'
import { setActivePinia, createPinia } from 'pinia'

jest.mock('~/stores/contact', () => {
  return {
    __esModule: true,
    useContactStore: () => {
      return {
        submit: jest.fn(),
      }
    },
  }
})

describe('ContactRequestForm', () => {
  describe('initial state', () => {
    beforeEach(() => setActivePinia(createPinia()))
    test('should render general request correctly', () => {
      const propsData = { contactRequestType: 'GENERAL_QUERY' }

      const wrapper = shallowMount(ContactRequestForm, {
        propsData,
      })
      const generalForm = wrapper.findComponent(GeneralRequest)
      expect(generalForm.exists()).toBeTruthy()
      expect(wrapper.exists()).toBeTruthy()
    })
    test('should render topic request correctly', () => {
      const propsData = { contactRequestType: 'SERVICE_REQUEST' }
      const wrapper = shallowMount(ContactRequestForm, { propsData })
      const topicForm = wrapper.findComponent(TopicRequest)

      expect(topicForm.exists()).toBeTruthy()
    })
    test('should render button', () => {
      const propsData = { contactRequestType: 'SERVICE_REQUEST' }
      const wrapper = shallowMount(ContactRequestForm, { propsData })
      const submitButton = wrapper.findComponent(Button)

      expect(submitButton.exists()).toBeTruthy()
    })
  })
})
