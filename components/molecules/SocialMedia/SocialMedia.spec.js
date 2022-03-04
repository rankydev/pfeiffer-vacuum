import { shallowMount } from '@vue/test-utils'
import SocialMedia from './SocialMedia.vue'
import SocialMediaContent from './SocialMedia.stories.content.js'
import SocialMediaIconLink from '~/components/molecules/SocialMediaIconLink/SocialMediaIconLink.vue'

describe('SocialMedia', () => {
  describe('initial state', () => {
    describe('given an array of media objects', () => {
      it('should render', () => {
        const propsData = { socialMedia: SocialMediaContent }
        const wrapper = shallowMount(SocialMedia, { propsData })

        const links = wrapper.findAllComponents(SocialMediaIconLink)

        SocialMediaContent.forEach((item, index) => {
          expect(links.at(index).vm.href).toBe(item.link)
          expect(links.at(index).vm.target).toBe(item.target)
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
