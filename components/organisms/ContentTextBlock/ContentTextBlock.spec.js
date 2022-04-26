import { shallowMount } from '@vue/test-utils'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import ConentTextBlock from './ContentTextBlock.vue'
import { text } from './ContentTextBlock.stories.content'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(ConentTextBlock, { propsData })
}

describe('ConentTextBlock', () => {
  describe('initial state', () => {
    it('should render Richtext component', () => {
      const propsData = { text }
      createComponent(propsData)

      const domRichtext = wrapper.findComponent(Richtext)

      expect(domRichtext.vm.richtext).toMatch(text)
    })
  })
})
