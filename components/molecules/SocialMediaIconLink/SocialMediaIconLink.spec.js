import { shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils'
import SocialMediaIconLink from './SocialMediaIconLink.vue'
import LinkContent from '~/components/atoms/Link/Link.stories.content'
import Icon from '~/components/atoms/Icon/Icon.vue'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtLink: RouterLinkStub }
  wrapper = shallowMount(SocialMediaIconLink, { propsData, stubs, localVue })
}

describe('SocialMediaIconLink', () => {
  describe('initial state', () => {
    it('should rander the label text when a label was given', () => {
      const propsData = { ...LinkContent, icon: 'facebook' }
      createComponent(propsData)

      const icon = wrapper.findComponent(Icon)

      expect(icon.vm.icon).toBe(propsData.icon)
      expect(icon.vm.type).toBe('svg')
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
