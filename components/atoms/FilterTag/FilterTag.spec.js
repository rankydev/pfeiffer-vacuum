import { shallowMount } from '@vue/test-utils'
import FilterTag from './FilterTag.vue'
import props from './FilterTag.stories.content.js'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { expect } from '@jest/globals'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(FilterTag, { propsData })
}

describe('FilterTag', () => {
  describe('initial state', () => {
    it('should render filter and value', () => {
      createComponent(props)
      const domText = wrapper.find('.filter-tag__text')

      expect(domText.text()).toMatch(`${props.filter}: `)
      expect(domText.text()).toMatch(`${props.value}`)
    })

    it('should render close icon', () => {
      createComponent(props)
      const domIcon = wrapper.findComponent(Icon)

      expect(domIcon.vm.icon).toBe('close')
    })

    it('should render suggestion modifier given isSuggestion true', () => {
      createComponent({ ...props, isSuggestion: true })

      const domRoot = wrapper.find('.filter-tag')
      const domIcon = wrapper.find('.filter-tag__icon')

      expect(domRoot.attributes('class')).toMatch('filter-tag--suggestion')
      expect(domIcon.attributes('class')).toMatch(
        'filter-tag__icon--suggestion'
      )
    })

    it('should render add icon given isSuggestion true', () => {
      createComponent({ ...props, isSuggestion: true })
      const domIcon = wrapper.findComponent(Icon)

      expect(domIcon.vm.icon).toBe('add')
    })
  })

  describe('during interaction', () => {
    it('should emit a click when clicked on the root element', () => {
      createComponent(props)
      const domRoot = wrapper.find('.filter-tag')
      domRoot.trigger('click')

      expect(wrapper.emitted().click.length).toBe(1)
    })
  })

  // describe('business requirements', () => {})
})
