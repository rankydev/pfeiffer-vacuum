import { shallowMount } from '@vue/test-utils'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { ref } from '@nuxtjs/composition-api'

const mockLoadRegions = jest.fn(() => {
  mockedRegions.value = ['Region1']
})
const mockedRegions = ref([])
jest.mock('~/composables/useRegions', () => {
  return {
    useRegions: () => {
      return {
        loadRegions: mockLoadRegions,
        regions: mockedRegions,
      }
    },
  }
})

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

    it('should return regions array when appropriate country was selected', async () => {
      const propsData = { type: 'GENERAL_QUERY', validate: true }
      const wrapper = shallowMount(GeneralRequest, { propsData })
      const select = wrapper.findComponent(PvSelect)

      const selectedOption = {
        isocode: 'US',
        name: 'United States of America',
      }
      select.vm.$emit('update', selectedOption)
      await select.vm.$nextTick()
      const allSelects = wrapper.findAllComponents(PvSelect)

      expect(mockLoadRegions).toHaveBeenCalled()
      expect(allSelects).toHaveLength(2)
    })
  })
})
