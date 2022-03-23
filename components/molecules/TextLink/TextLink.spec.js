import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import TextLink from './TextLink.vue'
import TextLinkContent from './TextLink.stories.content'
import LinkContent from '~/components/atoms/Link/Link.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtLink: RouterLinkStub }
  wrapper = shallowMount(TextLink, { propsData, stubs, localVue })
}

describe('TextLink', () => {
  describe('initial state', () => {
    it('should render the label text when a label was given', () => {
      const propsData = { ...LinkContent, ...TextLinkContent }
      createComponent(propsData)

      expect(wrapper.text()).toBe(propsData.label)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
