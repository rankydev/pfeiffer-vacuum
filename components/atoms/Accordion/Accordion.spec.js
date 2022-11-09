import { shallowMount, createLocalVue } from '@vue/test-utils'

import Accordion from './Accordion.vue'
import { accordionEntries } from './Accordion.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify({ accordionEntries }))

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
    test('should render accordion when no entries are provided', () => {
      createComponent()

      const accordionWrapper = wrapper.find('.accordion')

      expect(accordionWrapper).toBeTruthy()
      expect(accordionWrapper.text()).toBe('')
    })

    test('should render accordion entries when they are provided', () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const activeElements = wrapper.findAll('.accordion__button')

      expect(activeElements).toHaveLength(5)
    })

    describe('given multiple=false', () => {
      test('should open only the first element when multiple elements marked active', () => {
        const propsData = { ...defaultProps(), multiple: false }
        createComponent(propsData)

        const activeElements = wrapper.findAll('.accordion__button--active')
        expect(activeElements).toHaveLength(1)
      })
    })

    describe('given multiple=true', () => {
      test('should open all marked elements when multiple elements marked active ', () => {
        const propsData = { ...defaultProps(), multiple: true }
        createComponent(propsData)

        const triggerButtons = wrapper.findAll('.accordion__button--active')
        const activeEntries = accordionEntries.filter((entry) => entry.isActive)

        expect(triggerButtons).toHaveLength(activeEntries.length)
      })
    })
  })

  describe('during interaction', () => {
    test('should open accordion when user input was triggered', async () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const selector = '.accordion__button:not(.accordion__button--active)'
      const firstButton = wrapper.findAll(selector).at(0)
      const contentId = `#${firstButton.attributes('aria-controls')}`
      const content = wrapper.find(contentId)

      await firstButton.trigger('click')

      expect(firstButton.attributes('class')).toContain(
        'accordion__button--active'
      )
      expect(content.attributes('style')).toBe('')
    })

    test('should close accordion when second user input was tiggered on same element', async () => {
      const propsData = { ...defaultProps() }
      createComponent(propsData)

      const firstButton = wrapper.find('.accordion__button--active')
      const contentId = `#${firstButton.attributes('aria-controls')}`
      const content = wrapper.find(contentId)

      await firstButton.trigger('click')

      expect(firstButton.attributes('class')).not.toContain(
        'accordion__button--active'
      )
      expect(content.attributes('style')).not.toBe('')
    })

    describe('given multiple=false', () => {
      it('should close any open element when a new one is clicked', async () => {
        const propsData = { ...defaultProps(), multiple: false }
        createComponent(propsData)

        const activeElement = wrapper.find('.accordion__button--active')

        const selector = '.accordion__button:not(.accordion__button--active)'
        const inactiveButton = wrapper.find(selector)

        await inactiveButton.trigger('click')

        expect(activeElement.attributes('class')).not.toContain(
          'accordion__button--active'
        )
      })
    })

    describe('given multiple=true', () => {
      it('should not close any open element when a new element is clicked', async () => {
        const propsData = { ...defaultProps(), multiple: true }
        createComponent(propsData)

        const activeElements = wrapper.findAll('.accordion__button--active')

        const selector = '.accordion__button:not(.accordion__button--active)'
        const inactiveButton = wrapper.find(selector)

        await inactiveButton.trigger('click')

        activeElements.wrappers.forEach((childWrapper) => {
          expect(childWrapper.attributes('class')).toContain(
            'accordion__button--active'
          )
        })
      })

      it('should not close any open element when the activator was clicked', async () => {
        const propsData = { ...defaultProps(), multiple: true }
        createComponent(propsData)
        const activeElement = wrapper.find('.accordion__button--active')

        await activeElement.trigger('click')

        expect(activeElement.attributes('class')).not.toContain(
          'accordion__button--active'
        )
      })
    })
  })
})
