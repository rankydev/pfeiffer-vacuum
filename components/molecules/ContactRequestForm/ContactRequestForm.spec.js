import { shallowMount } from '@vue/test-utils'
import ContactRequestForm from '~/components/molecules/ContactRequestForm/ContactRequestForm'

const propsData = { contactRequestType: 'QUOTE' }

describe('ContactRequestForm', () => {
  describe('initial state', () => {
    test('should render correctly', () => {
      const wrapper = shallowMount(ContactRequestForm, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
