import { shallowMount, createLocalVue } from '@vue/test-utils'
import TextLink from './TextLink.vue'
import TextLinkContent from './TextLink.stories.content'
import LinkContent from '~/components/atoms/Link/Link.stories.content'

const localVue = createLocalVue()
const editable = (el, key) => (el.innerText = key.value)
localVue.directive('editable', editable)

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(TextLink, { propsData, localVue })
}

describe('TextLink', () => {
  describe('initial state', () => {
    it('should rander the label text when a label was given', () => {
      const propsData = { ...LinkContent, ...TextLinkContent }
      createComponent(propsData)

      expect(wrapper.text()).toBe(propsData.label)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
