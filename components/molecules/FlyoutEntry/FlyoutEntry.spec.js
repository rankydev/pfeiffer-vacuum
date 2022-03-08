import { shallowMount } from '@vue/test-utils'
import FlyoutEntry from './FlyoutEntry.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

const defaultProps = () => ({ label: 'Some Label', icon: 'someIcon' })

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

    it('should render no Link component when given no link array', () => {
      const propsData = { ...defaultProps() }
      const wrapper = shallowMount(FlyoutEntry, { propsData })

      const link = wrapper.findComponent(Link)

      expect(link.exists()).toBeFalsy()
    })

    it('should render a Link component when given as a link array with an entry', () => {
      const propsData = {
        ...defaultProps(),
        link: { href: '/someUrl', target: '_blank' },
      }
      const wrapper = shallowMount(FlyoutEntry, { propsData })
      const link = wrapper.findComponent(Link)

      expect(link.exists()).toBeTruthy()
      expect(link.vm.href).toBe(propsData.link[0].href)
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
