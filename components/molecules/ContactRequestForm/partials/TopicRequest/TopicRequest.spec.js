import { shallowMount } from '@vue/test-utils'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'

describe('TopicRequest', () => {
  describe('initial state', () => {
    test('should render correctly', () => {
      const wrapper = shallowMount(TopicRequest, {
        propsData: { type: 'QUOTE' },
      })
      const inputArr = wrapper.findAllComponents(PvInput)
      const select = wrapper.findComponent(PvSelect)
      const textarea = wrapper.findComponent(PvTextArea)

      expect(wrapper.exists()).toBeTruthy()
      expect(inputArr).toHaveLength(8)
      expect(select).toBeTruthy()
      expect(textarea).toBeTruthy()
    })

    test('select should contain countries given countries propsData', () => {
      const propsData = { type: 'QUOTE', countries: ['Land1', 'Land2'] }
      const wrapper = shallowMount(TopicRequest, { propsData })
      const select = wrapper.findComponent(PvSelect)

      expect(select.vm.options).toBe(propsData.countries)
    })

    test('should validate given validate propsData', () => {
      const propsData = { type: 'QUOTE', validate: true }
      const wrapper = shallowMount(TopicRequest, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })
  })
})
