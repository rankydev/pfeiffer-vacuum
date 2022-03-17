import { shallowMount, createLocalVue } from '@vue/test-utils'

import Richtext from './Richtext.vue'
import RichtextContent from './Richtext.stories.content'

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
          richtext: RichtextContent.content.richtext,
        },
      })

      expect(wrapper.html()).toContain(RichtextContent.content.richtext)
    })
  })
})
