import VacuumRangeSlider from './VacuumRangeSlider'
import { shallowMount } from '@vue/test-utils'
import sliderData from './VacuumRangeSlider.json'

describe('VacuumRangeSlider', () => {
  describe('initial state', () => {
    test('should render properly given no props', () => {
      const wrapper = shallowMount(VacuumRangeSlider)
      const ranges = wrapper.findAll('.vacuum-range-slider__range')
      const slider = wrapper.find('vueslider-stub')

      expect(ranges.length).toBe(sliderData.ranges.length)
      expect(slider.exists()).toBeTruthy()
    })
    test('should not render ranges given showRanges = false', () => {
      const wrapper = shallowMount(VacuumRangeSlider, {
        propsData: { showRanges: false },
      })
      const rangeWrapper = wrapper.find('.vacuum-range-slider__ranges')

      expect(rangeWrapper.exists()).toBeFalsy()
    })
  })
  describe('during interaction', () => {
    test('should emit correct value on range click', async () => {
      const wrapper = shallowMount(VacuumRangeSlider)
      const ranges = wrapper.findAll('.vacuum-range-slider__range')
      const mockEmit = jest.fn()

      wrapper.vm.$emit = mockEmit

      await ranges.at(0).trigger('click')

      expect(mockEmit).toBeCalledWith('update', ['1E-10', '1E-8'])
    })
  })
})
