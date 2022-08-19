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

    test('select should contain countries given countries propsData', () => {
      const propsData = { type: 'QUOTE', countries: ['Country1', 'Country2'] }
      const wrapper = shallowMount(TopicRequest, { propsData })
      const select = wrapper.findComponent(PvSelect)

      expect(select.vm.options).toBe(propsData.countries)
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { type: 'QUOTE', validate: true }
      const wrapper = shallowMount(TopicRequest, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { type: 'QUOTE', validate: true }
      const wrapper = shallowMount(TopicRequest, { propsData })
      wrapper.vm.regions = [1, 2]
      const select = wrapper.findAllComponents(PvSelect)

      expect(wrapper.exists()).toBeTruthy()
      expect(select).toHaveLength(2)
    })
  })
})
