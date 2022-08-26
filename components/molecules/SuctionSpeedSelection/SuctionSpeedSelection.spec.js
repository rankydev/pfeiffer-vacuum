import { shallowMount } from '@vue/test-utils'
import SuctionSpeedSelection from '~/components/molecules/SuctionSpeedSelection/SuctionSpeedSelection'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import Button from '~/components/atoms/Button/Button'
import { expect } from '@jest/globals'

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

    test('should render placeholder correctly if meters is selected', () => {
      const wrapper = shallowMount(SuctionSpeedSelection)
      const min = wrapper.find('.suction-speed-selection__minimum')
      const max = wrapper.find(
        '.suction-speed-selection__maximum--selected-value'
      )

      expect(min.vm.placeholder).toBe('0')
      expect(max.vm.placeholder).toBe('10.000')
    })

    test('should render placeholder correctly if liters is selected', async () => {
      const wrapper = shallowMount(SuctionSpeedSelection)
      await wrapper.vm.unitChanged('liters')
      await wrapper.vm.$nextTick()
      const min = wrapper.find('.suction-speed-selection__minimum')
      const max = wrapper.find(
        '.suction-speed-selection__maximum--selected-value'
      )

      expect(min.vm.placeholder).toBe('0')
      expect(max.vm.placeholder).toBe('2778')
    })
  })

  describe('during interaction', () => {
    test('should calculate the correct upper and lower bound when unit is changed to liters', async () => {
      const wrapper = shallowMount(SuctionSpeedSelection)

      await wrapper.vm.unitChanged('liters')
      await wrapper.vm.$nextTick()

      wrapper.setData({ lowerBound: -23, upperBound: 6219 })

      await wrapper.vm.applyFilter()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.lowerBound).toBe(0)
      expect(wrapper.vm.upperBound).toBe(2778)
    })

    test('should calculate the correct upper and lower bound when unit is meters', async () => {
      const wrapper = shallowMount(SuctionSpeedSelection)

      wrapper.setData({ lowerBound: -23, upperBound: 60219 })

      await wrapper.vm.applyFilter()
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.lowerBound).toBe(0)
      expect(wrapper.vm.upperBound).toBe(10000)
    })
  })
})
