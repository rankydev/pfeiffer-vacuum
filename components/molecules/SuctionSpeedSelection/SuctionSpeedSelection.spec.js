import { shallowMount } from '@vue/test-utils'
import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import Button from '~/components/atoms/Button/Button'

describe('SuctionSpeedSelection', () => {
  describe('initial state', () => {
    test('should render suction speed selection correctly', () => {
      const wrapper = shallowMount(SuctionSpeedSelection)
      const inputArr = wrapper.findAllComponents(PvInput)
      const buttonGroup = wrapper.findComponent(ButtonGroup)
      const button = wrapper.findComponent(Button)

      expect(wrapper.exists()).toBeTruthy()
      expect(inputArr).toHaveLength(2)
      expect(buttonGroup).toBeTruthy()
      expect(button).toBeTruthy()
    })

    test('should calculate the correct upper and lower bound when unit is changed to liters', async () => {
      const wrapper = shallowMount(SuctionSpeedSelection)

      wrapper.setData({ lowerBound: -23, upperBound: 6219 })

      await wrapper.vm.unitChanged('liters')
      await wrapper.vm.$nextTick()
      await wrapper.vm.applyFilter()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.lowerBound).toBe(0)
      expect(wrapper.vm.upperBound).toBe(2776)
    })

    test('should calculate the correct upper and lower bound when unit is changed to meters', async () => {
      const wrapper = shallowMount(SuctionSpeedSelection)

      wrapper.setData({ lowerBound: -23, upperBound: 60219 })

      await wrapper.vm.unitChanged('meters')
      await wrapper.vm.$nextTick()
      await wrapper.vm.applyFilter()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.lowerBound).toBe(0)
      expect(wrapper.vm.upperBound).toBe(10000)
    })
  })
})
