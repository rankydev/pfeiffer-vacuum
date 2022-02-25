import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'

import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import FooterNavigation from './partials/FooterNavigation/FooterNavigation'
import FooterBottom from './partials/FooterBottom/FooterBottom'

describe('Footer', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs })

      const socialMedia = wrapper.findComponent(SocialMedia)
      const footerNavigation = wrapper.findComponent(FooterNavigation)
      const footerBottom = wrapper.findComponent(FooterBottom)

      expect(socialMedia.exists()).toBeTruthy()
      expect(footerNavigation.exists()).toBeTruthy()
      expect(footerBottom.exists()).toBeTruthy()
    })
  })
})
