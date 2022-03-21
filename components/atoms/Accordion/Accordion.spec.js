import { shallowMount, createLocalVue } from '@vue/test-utils'

import Accordion from './Accordion.vue'
import { accordionEntries } from './Accordion.stories.content'

const propsData = { accordionEntries }

let wrapper

function createComponent(propsData = {}) {
  const stubs = { AnimatedCollapse: true, Icon: true, NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(Accordion, options)
}

describe('Accordion', () => {
  describe('initial state', () => {
    test('should render accordion given no entries', () => {
      createComponent()

      const accordionWrapper = wrapper.find('.accordion')

      expect(accordionWrapper).toBeTruthy()
      expect(accordionWrapper.text()).toBe('')
    })

    test('should render accordion entries given sample data', () => {
      createComponent(propsData)

      const triggerButtons = wrapper.findAll('.accordion__button')

      expect(triggerButtons).toHaveLength(5)
    })
  })

  describe('during interaction', () => {
    test('should open accordion given user input event', async () => {
      createComponent(propsData)

      const firstButton = wrapper.findAll('.accordion__button').at(0)
      const content = wrapper.find('#accordion-0')

      await firstButton.trigger('click')

      expect(firstButton.attributes('class')).toContain(
        'accordion__button--active'
      )
      expect(content.attributes('style')).toBe('')
    })

    test('should close accordion given second user input on same trigger', async () => {
      createComponent(propsData)

      // preparation for opening the accordion
      const firstButton = wrapper.findAll('.accordion__button').at(0)
      const content = wrapper.find('#accordion-0')

      await firstButton.trigger('click')

      // actual test for closing the accordion
      await firstButton.trigger('click')

      expect(firstButton.attributes('class')).not.toContain(
        'accordion__button--active'
      )
      expect(content.attributes('style')).not.toBe('')
    })
  })
})
