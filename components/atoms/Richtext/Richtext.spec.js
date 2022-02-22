import { shallowMount, createLocalVue } from '@vue/test-utils'

import Richtext from './Richtext.vue'
import richtext from './Richtext.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('Richtext', () => {
  describe('initial state', () => {
    test('should render richtext text given content object', () => {
      const wrapper = shallowMount(Richtext, {
        localVue,
        propsData: {
          content: richtext.content,
        },
      })

      expect(wrapper.html()).toContain(richtext.content.paragraph)
    })
  })
})
