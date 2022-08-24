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
  })
})
