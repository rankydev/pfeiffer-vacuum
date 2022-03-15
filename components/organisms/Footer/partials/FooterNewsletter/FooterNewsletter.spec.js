import { createLocalVue, shallowMount } from '@vue/test-utils'
import FooterNewsletter from './FooterNewsletter'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('FooterNewsletter', () => {
  describe('initial state', () => {
    it('should...', () => {
      const wrapper = shallowMount(FooterNewsletter)
    })
  })
})
