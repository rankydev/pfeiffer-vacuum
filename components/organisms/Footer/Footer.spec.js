import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import FooterNewsletter from './partials/FooterNewsletter/FooterNewsletter'
import TextLink from '~/components/molecules/Links/TextLink/TextLink'
import Link from '~/components/atoms/Link/Link'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('Footer', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs, localVue })

      const socialMedia = wrapper.findComponent(SocialMedia)
      const footerNewsletter = wrapper.findComponent(FooterNewsletter)

      expect(socialMedia.exists()).toBeTruthy()
      expect(footerNewsletter.exists()).toBeTruthy()
    })
  })

  describe('show version info', () => {
    it('should render version info and link for development', () => {
      process.env.NODE_ENV = 'development'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'
      process.env.CI_REPOSITORY_URL = 'https://localhost'
      process.env.CI_PROJECT_PATH = 'pvac/pvweb'

      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs, localVue })

      const textLink = wrapper.findComponent(TextLink)

      expect(textLink.exists()).toBeTruthy()
      // TODO: check why this does not work.
      //expect(textLink.text()).toBe('Version: test_version_info/12345678')
    })

    it('should NOT render version info and link in production', () => {
      process.env.NODE_ENV = 'production'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_REPOSITORY_URL = 'https://localhost'
      process.env.CI_PROJECT_PATH = 'pvac/pvweb'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'

      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs, localVue })

      const textLink = wrapper.findComponent(TextLink)

      expect(textLink.exists()).toBeFalsy()
    })
  })
})
