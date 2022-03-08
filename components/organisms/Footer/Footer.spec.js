import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import FooterNewsletter from './partials/FooterNewsletter/FooterNewsletter'

describe('Footer', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs })

      const socialMedia = wrapper.findComponent(SocialMedia)
      const footerNewsletter = wrapper.findComponent(FooterNewsletter)

      expect(socialMedia.exists()).toBeTruthy()
      expect(footerNewsletter.exists()).toBeTruthy()
    })
  })
})
