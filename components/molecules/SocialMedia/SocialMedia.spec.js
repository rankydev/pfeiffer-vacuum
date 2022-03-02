import { shallowMount } from '@vue/test-utils'
import SocialMedia from './SocialMedia.vue'
import SocialMediaContent from './SocialMedia.content'

describe('SocialMedia', () => {
  describe('initial state', () => {
    describe('given entry objects', () => {
      it('should render', () => {
        const propsData = { media: SocialMediaContent }
        const wrapper = shallowMount(SocialMedia, { propsData })

        const links = wrapper.findAll('link')

        SocialMediaContent.forEach((item, index) => {
          expect(links.at(index).attributes('href')).toBe(item.link)
          expect(links.at(index).attributes('target')).toBe(item.target)
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
