import { createLocalVue, shallowMount } from '@vue/test-utils'
import FooterBottom from './FooterBottom'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('FooterBotton', () => {
  describe('initial state', () => {
    it('should...', () => {
      const wrapper = shallowMount(FooterBottom)
    })
  })
})
