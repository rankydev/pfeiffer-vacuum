import { shallowMount } from '@vue/test-utils'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'

describe('GeneralRequest', () => {
  describe('initial state', () => {
    test('should render correctly', () => {
      const wrapper = shallowMount(GeneralRequest)

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
