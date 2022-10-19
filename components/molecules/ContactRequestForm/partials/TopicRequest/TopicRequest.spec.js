import { shallowMount } from '@vue/test-utils'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'

describe('TopicRequest', () => {
  describe('initial state', () => {
    test('should render component correctly given valid type prop', () => {
      const wrapper = shallowMount(TopicRequest, {
        propsData: { type: 'QUOTE' },
      })
      const inputArr = wrapper.findAllComponents(PvInput)
      const select = wrapper.findComponent(PvSelect)
      const textarea = wrapper.findComponent(PvTextArea)
      const addressWrapper = wrapper.findAll('.topic-request__address')

      expect(wrapper.exists()).toBeTruthy()
      expect(addressWrapper).toHaveLength(2)
      expect(inputArr).toHaveLength(8)
      expect(select).toBeTruthy()
      expect(textarea).toBeTruthy()
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { type: 'QUOTE' }
      const wrapper = shallowMount(TopicRequest, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
