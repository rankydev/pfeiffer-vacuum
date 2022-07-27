import { shallowMount } from '@vue/test-utils'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'

describe('GeneralRequest', () => {
  describe('initial state', () => {
    test('should render correctly', () => {
      const wrapper = shallowMount(TopicRequest)
      const inputArr = wrapper.findAllComponents(PvInput)
      const select = wrapper.findComponent(PvSelect)
      const textarea = wrapper.findComponent(PvTextArea)

      expect(wrapper.exists()).toBeTruthy()
      expect(inputArr).toHaveLength(8)
      expect(select).toBeTruthy()
      expect(textarea).toBeTruthy()
    })
  })
})
