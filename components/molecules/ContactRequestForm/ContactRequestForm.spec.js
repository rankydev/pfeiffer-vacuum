import { createLocalVue, shallowMount } from '@vue/test-utils'
import ContactRequestForm from '~/components/molecules/ContactRequestForm/ContactRequestForm'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button'

const mocks = {
  $nuxt: {
    context: {
      $hybrisApi: {
        countriesApi: {
          getCountries: jest.fn((e) => e),
        },
      },
    },
  },
}

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

describe('ContactRequestForm', () => {
  describe('initial state', () => {
    test('should render general request correctly', () => {
      const propsData = { contactRequestType: 'GENERAL_QUERY' }

      const wrapper = shallowMount(ContactRequestForm, {
        propsData,
        localVue,
      })
      const generalForm = wrapper.findComponent(GeneralRequest)

      expect(generalForm.exists()).toBeTruthy()
      expect(wrapper.exists()).toBeTruthy()
    })
    test('should render topic request correctly', () => {
      const propsData = { contactRequestType: 'SERVICE_REQUEST' }
      const wrapper = shallowMount(ContactRequestForm, { propsData, localVue })
      const topicForm = wrapper.findComponent(TopicRequest)

      expect(topicForm.exists()).toBeTruthy()
    })
    test('should render button', () => {
      const propsData = { contactRequestType: 'SERVICE_REQUEST' }
      const wrapper = shallowMount(ContactRequestForm, { propsData, localVue })
      const submitButton = wrapper.findComponent(Button)

      expect(submitButton.exists()).toBeTruthy()
    })
  })
})
