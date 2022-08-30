import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import TopNavigation from './TopNavigation.vue'
import FlyoutEntry from '~/components/molecules/FlyoutEntry/FlyoutEntry.vue'
import { nanoid } from 'nanoid'

const flyoutLinks = () => [
  {
    _uid: nanoid(),
    icon: 'work',
    href: '/someUrl',
    target: '_blank',
    label: 'Karriere',
  },
  {
    _uid: nanoid(),
    icon: 'business',
    href: '/someUrl',
    target: '_blank',
    label: 'Business',
  },
  {
    _uid: nanoid(),
    icon: 'group',
    href: '/someUrl',
    target: '_blank',
    label: 'Investor Relation',
  },
]

let wrapper

function createComponent(propsData = {}, { attachTo, shallow = true } = {}) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData: {
      flyoutLinks: flyoutLinks(),
      ...propsData,
    },
    attachTo,
  }

  wrapper = shallow
    ? shallowMount(TopNavigation, options)
    : mount(TopNavigation, options)
}

describe('TopNavigation', () => {
  describe('initial state', () => {
    it('should render all flyout entries', () => {
      createComponent()

      const flyoutEntries = wrapper.findAllComponents(FlyoutEntry)
      expect(flyoutEntries.length).toBe(flyoutLinks().length)

      flyoutEntries.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.label).toBe(flyoutLinks()[idx].label)
        expect(eleWrapper.vm.icon).toBe(flyoutLinks()[idx].icon)
        expect(eleWrapper.attributes('href')).toEqual(flyoutLinks()[idx].href)
        expect(eleWrapper.attributes('target')).toEqual(
          flyoutLinks()[idx].target
        )
      })
    })

    it('should set the flyout entry active to true when v-model true', () => {
      createComponent({ value: true })

      const flyoutEntries = wrapper.findAllComponents(FlyoutEntry)

      flyoutEntries.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.active).toBe(true)
      })
    })

    it('should set the flyout entry active to false when v-model false', () => {
      createComponent({ value: false })

      const flyoutEntries = wrapper.findAllComponents(FlyoutEntry)

      flyoutEntries.wrappers.forEach((eleWrapper, idx) => {
        expect(eleWrapper.vm.active).toBe(false)
      })
    })

    it('should render when no flyouts are provided', () => {
      createComponent({ flyoutLinks: undefined })

      const element = wrapper.find('.top-navigation')
      expect(element.exists()).toBeTruthy()
    })

    it('should reserve space for max 4 flyouts when provided more than 4', () => {
      createComponent({ flyoutLinks: [...flyoutLinks(), ...flyoutLinks()] })

      const spacer = wrapper.find('.top-navigation__spacer')
      expect(spacer.attributes('class')).toMatch('--length-4')
    })
  })

  describe('during interaction', () => {
    it('should emit input event when user focus flyouts', () => {
      const div = document.createElement('div')
      div.id = 'root'
      document.body.appendChild(div)

      createComponent({}, { attachTo: '#root', shallow: false })

      const flyoutEntry = wrapper.find('.top-navigation__flyout')
      flyoutEntry.trigger('focus')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([true])
    })

    it('should emit input event when user blur flyouts', () => {
      createComponent()

      const flyoutEntry = wrapper.find('.top-navigation__flyout')
      flyoutEntry.trigger('blur')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([false])
    })

    it('should emit input event when user mouseover flyouts', () => {
      createComponent()

      const flyoutWrapper = wrapper.find('.top-navigation__spacer')
      flyoutWrapper.trigger('mouseenter')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([true])
    })

    it('should emit input event when user mouseleave flyouts', () => {
      createComponent()

      const flyoutWrapper = wrapper.find('.top-navigation__spacer')
      flyoutWrapper.trigger('mouseleave')

      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([false])
    })
  })

  // describe('business requirements', () => {})
})
