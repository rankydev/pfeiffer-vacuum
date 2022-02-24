import { shallowMount } from '@vue/test-utils'

import ContentWrapper from './ContentWrapper.vue'

const content = 'Lorem ipsum dolor sit amet'

describe('ContentWrapper', () => {
  describe('initial state', () => {
    test('should render filled wrapper given slot content', () => {
      const wrapper = shallowMount(ContentWrapper, {
        slots: { default: content },
      })

      expect(wrapper.find('.content-wrapper').text()).toBe(content)
    })
  })
})
