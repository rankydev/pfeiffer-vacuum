import { createLocalVue, shallowMount } from '@vue/test-utils'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import HelpContainer from './HelpContainer.vue'
import {
  headline,
  subline,
  icon,
  buttons,
  richtext,
} from './HelpContainer.stories.content.js'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(HelpContainer, options)
}

describe('HelpContainer', () => {
  describe('initial state', () => {
    it('should provide headline subline, icon and richtext to richtext component when these are provided', () => {
      const propsData = { headline, subline, richtext, icon }
      createComponent(propsData)
      const domHeadline = wrapper.find('.help-container__headline')
      const domSubline = wrapper.find('.help-container__subline')
      const domRichtext = wrapper.findComponent(Richtext)
      const domIcon = wrapper.findComponent(Icon)

      expect(domHeadline.text()).toMatch(headline)
      expect(domSubline.text()).toMatch(subline)
      expect(domRichtext.vm.richtext).toMatch(richtext)
      expect(domIcon.vm.icon).toMatch(icon)
    })

    it('should add button to the button area when it is provided', () => {
      const propsData = { buttons }
      createComponent(propsData)

      const domButtons = wrapper.findAll('.help-container__button')

      expect(domButtons.length).toBe(buttons.length)
      domButtons.wrappers.forEach((domButton, idx) => {
        expect(domButton.attributes('component')).toBe(buttons[idx].component)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
