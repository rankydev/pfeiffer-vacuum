import { shallowMount, createLocalVue } from '@vue/test-utils'

import Richtext from './Richtext.vue'
import {
  headlines,
  styleOptions,
  links,
  unorderedList,
  orderedList,
} from './Richtext.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(Richtext, { localVue, propsData })
}

describe('Richtext', () => {
  describe('initial state', () => {
    test('should render correct richtext given all headlines and sublines', () => {
      createComponent({ richtext: headlines })

      expect(wrapper.find('h2')).toBeTruthy()
      expect(wrapper.find('h3')).toBeTruthy()
      expect(wrapper.find('h4')).toBeTruthy()
      expect(wrapper.find('h5')).toBeTruthy()
      expect(wrapper.find('h6')).toBeTruthy()
      expect(wrapper.find('.tw-subline-2')).toBeTruthy()
      expect(wrapper.find('.tw-subline-3')).toBeTruthy()
      expect(wrapper.find('.tw-subline-4')).toBeTruthy()
      expect(wrapper.find('.tw-subline-5')).toBeTruthy()
      expect(wrapper.find('.tw-subline-6')).toBeTruthy()
    })

    test('should render correct richtext given sub and super style options', () => {
      createComponent({ richtext: styleOptions })

      expect(wrapper.find('.superscript')).toBeTruthy()
      expect(wrapper.find('.subscript')).toBeTruthy()
    })

    test('should render correct richtext given different link types', () => {
      createComponent({ richtext: links })

      expect(wrapper.findAll('a')).toHaveLength(4)
    })

    test('should render correct richtext given unordered list', () => {
      createComponent({ richtext: unorderedList })

      expect(wrapper.findAll('ul')).toHaveLength(4)
      expect(wrapper.findAll('li')).toHaveLength(6)
    })

    test('should render correct richtext given ordered list', () => {
      createComponent({ richtext: orderedList })

      expect(wrapper.findAll('ol')).toHaveLength(3)
      expect(wrapper.findAll('li')).toHaveLength(6)
    })
  })

  describe('during interaction', () => {
    test.only('should trigger router push only on internal links', async () => {
      createComponent({ richtext: links })

      const pushMock = jest.fn()
      const linkElements = wrapper.findAll('a')
      const externalLink = linkElements.at(0)
      const internalLink = linkElements.at(1)

      wrapper.vm.router = { push: pushMock }

      // trigger both links
      await externalLink.trigger('click')
      await internalLink.trigger('click')

      // expect exactly one router push call
      expect(pushMock).toBeCalledTimes(1)
    })
  })
})
