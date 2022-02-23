import { shallowMount } from '@vue/test-utils'
import TopNavigation from './TopNavigation.vue'
import Flyout from '~/components/molecules/Flyout/Flyout.vue'

describe('TopNavigation', () => {
  describe('initial state', () => {
    it('should render all flyout elements', () => {
      const wrapper = shallowMount(TopNavigation)

      const flyoutItems = wrapper.findAllComponents(Flyout)

      expect(flyoutItems.length).toBe(wrapper.vm.elementCount)

      flyoutItems.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.label).toBe(wrapper.vm.elements[idx].label)
        expect(eleWrapper.vm.icon).toBe(wrapper.vm.elements[idx].icon)
      })
    })

    it('should set the flyout active to true when v-model true', () => {
      const propsData = { value: true }
      const wrapper = shallowMount(TopNavigation, { propsData })

      const flyoutItems = wrapper.findAllComponents(Flyout)

      flyoutItems.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.active).toBe(true)
      })
    })

    it('should set the flyout active to false when v-model false', () => {
      const propsData = { value: false }
      const wrapper = shallowMount(TopNavigation, { propsData })

      const flyoutItems = wrapper.findAllComponents(Flyout)

      flyoutItems.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.active).toBe(false)
      })
    })
  })

  describe('during interaction', () => {
    it('should emit input event when user focus flyouts', () => {
      const div = document.createElement('div')
      div.id = 'root'
      document.body.appendChild(div)
      const wrapper = shallowMount(TopNavigation, { attachTo: '#root' })

      const flyoutItem = wrapper.find('.top-navigation__flyout')
      flyoutItem.trigger('focus')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([true])
    })

    it('should emit input event when user blur flyouts', () => {
      const wrapper = shallowMount(TopNavigation)

      const flyoutItem = wrapper.find('.top-navigation__flyout')
      flyoutItem.trigger('blur')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([false])
    })

    it('should emit input event when user mouseover flyouts', () => {
      const wrapper = shallowMount(TopNavigation)

      const flyoutWrapper = wrapper.find('.top-navigation__spacer')
      flyoutWrapper.trigger('mouseenter')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([true])
    })

    it('should emit input event when user mouseleave flyouts', () => {
      const wrapper = shallowMount(TopNavigation)

      const flyoutWrapper = wrapper.find('.top-navigation__spacer')
      flyoutWrapper.trigger('mouseleave')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([false])
    })
  })

  // describe('business requirements', () => {})
})
