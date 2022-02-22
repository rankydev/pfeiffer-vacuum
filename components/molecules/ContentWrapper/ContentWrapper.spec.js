import { shallowMount, createLocalVue } from '@vue/test-utils'

import ContentWrapper from './ContentWrapper.vue'
import contentWrapper from './ContentWrapper.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('ContentWrapper', () => {
  describe('initial state', () => {
    test('should render correct content items given content object', () => {
      const wrapper = shallowMount(ContentWrapper, {
        localVue,
        propsData: {
          content: contentWrapper.content,
        },
      })

      const items = wrapper.findAll('nuxt-dynamic')

      expect(items.at(0).attributes('content')).toContain(
        contentWrapper.content.items[0]
      )

      expect(items.at(1).attributes('content')).toContain(
        contentWrapper.content.items[1]
      )
    })
  })
})
