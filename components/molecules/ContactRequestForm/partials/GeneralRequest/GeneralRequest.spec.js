import { shallowMount } from '@vue/test-utils'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'

describe('GeneralRequest', () => {
  describe('initial state', () => {
    test('should render component correctly given valid type prop', () => {
      const wrapper = shallowMount(GeneralRequest, {
        propsData: { type: 'GENERAL_QUERY' },
      })
      const inputArr = wrapper.findAllComponents(PvInput)
      const select = wrapper.findComponent(PvSelect)
      const textarea = wrapper.findComponent(PvTextArea)

      expect(wrapper.exists()).toBeTruthy()
      expect(inputArr).toHaveLength(3)
      expect(select).toBeTruthy()
      expect(textarea).toBeTruthy()
    })

    test('select should contain countries given countries propsData', () => {
      const propsData = {
        type: 'GENERAL_QUERY',
        countries: ['Country1', 'Country2'],
      }
      const wrapper = shallowMount(GeneralRequest, { propsData })
      const select = wrapper.findComponent(PvSelect)

      expect(select.vm.options).toBe(propsData.countries)
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { type: 'GENERAL_QUERY', validate: true }
      const wrapper = shallowMount(GeneralRequest, { propsData })

      expect(wrapper.exists()).toBeTruthy()
    })

    test('should validate input fields given validate propsData', () => {
      const propsData = { type: 'GENERAL_QUERY', validate: true }
      const wrapper = shallowMount(GeneralRequest, { propsData })
      wrapper.vm.regions = [1, 2]
      const select = wrapper.findAllComponents(PvSelect)

      expect(wrapper.exists()).toBeTruthy()
      expect(select).toHaveLength(2)
    })
  })
})
