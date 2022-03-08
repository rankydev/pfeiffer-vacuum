import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import TextLink from './TextLink.vue'
import TextLinkContent from './TextLink.stories.content'
import LinkContent from '~/components/atoms/Link/Link.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtLink: RouterLinkStub }
  wrapper = shallowMount(TextLink, { propsData, stubs })
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
