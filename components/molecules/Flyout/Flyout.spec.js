import { shallowMount } from '@vue/test-utils'
import Flyout from './Flyout.vue'
import Icon from '../../atoms/Icon/Icon.vue'

const defaultProps = () => ({ label: 'Some Label', icon: 'someIcon' })

describe('Flyout', () => {
  describe('initial state', () => {
    it('should render the label when given as a prop', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(Flyout, { propsData })

      expect(wrapper.text()).toBe(propsData.label)
    })

    it('should provide the icon to the icon component when given as a prop', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(Flyout, { propsData })

      const iconDom = wrapper.findComponent(Icon)

      expect(iconDom.vm.icon).toBe(propsData.icon)
    })

    it('should show the label when active=true', () => {
      const propsData = { active: true, ...defaultProps() }
      const wrapper = shallowMount(Flyout, { propsData })

      const label = wrapper.find('.flyout__label')

      expect(label.isVisible()).toBeTruthy()
    })

    it('should hide the label when active=false', () => {
      const propsData = { active: false, ...defaultProps() }
      const wrapper = shallowMount(Flyout, { propsData })

      const label = wrapper.find('.flyout__label')

      expect(label.isVisible()).toBeFalsy()
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
