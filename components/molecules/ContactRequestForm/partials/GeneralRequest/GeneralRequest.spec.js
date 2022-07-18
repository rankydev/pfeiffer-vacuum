import { shallowMount } from '@vue/test-utils'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'

describe('GeneralRequest', () => {
  describe('initial state', () => {
    test('should render correctly', () => {
      const wrapper = shallowMount(GeneralRequest)
      const inputArr = wrapper.findAllComponents(PvInput)
      const select = wrapper.findComponent(PvSelect)
      const textarea = wrapper.findComponent(PvTextArea)

      expect(wrapper.exists()).toBeTruthy()
      expect(inputArr).toHaveLength(3)
      expect(select).toBeTruthy()
      expect(textarea).toBeTruthy()
    })
  })
})
