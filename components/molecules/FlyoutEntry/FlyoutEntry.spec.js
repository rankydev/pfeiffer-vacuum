import { shallowMount } from '@vue/test-utils'
import FlyoutEntry from './FlyoutEntry.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Links/Link/Link.vue'

const defaultProps = () => ({
  label: 'Some Label',
  icon: 'someIcon',
  href: 'https://www.linkedin.com/pfeiffer-vacuum',
  target: '_blank',
})

describe('FlyoutEntry', () => {
  describe('initial state', () => {
    it('should render the label when given as a prop', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })

      expect(wrapper.text()).toBe(propsData.label)
    })

    it('should provide the icon to the icon component when given as a prop', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })

      const icon = wrapper.findComponent(Icon)

      expect(icon.vm.icon).toBe(propsData.icon)
    })

    it('should render a Link component when given as a link array with an entry', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })
      const link = wrapper.findComponent(Link)

      expect(link.exists()).toBeTruthy()
      expect(link.attributes('href')).toBe(propsData.href)
    })

    it('should show the label when active=true', () => {
      const propsData = { active: true, ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })

      const label = wrapper.find('.flyout-entry__label')

      expect(label.isVisible()).toBeTruthy()
    })

    it('should hide the label when active=false', () => {
      const propsData = { active: false, ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })

      const label = wrapper.find('.flyout-entry__label')

      expect(label.isVisible()).toBeFalsy()
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
