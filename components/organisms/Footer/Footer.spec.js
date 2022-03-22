import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import FooterNewsletter from './partials/FooterNewsletter/FooterNewsletter'
import TextLink from '~/components/molecules/Links/TextLink/TextLink'

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

    it('should render version info and link given development variables', () => {
      process.env.NODE_ENV = 'development'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'
      process.env.CI_PROJECT_URL = 'https://localhost/pvac/pvweb'

      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs, localVue })

      const textLink = wrapper.findComponent(TextLink)

      console.log(wrapper.html())

      expect(textLink.exists()).toBeTruthy()
      // not textLink.text() because of shallowMount, thus only stub with attributes available
      expect(textLink.attributes('label')).toBe(
        'Version: test_version_info/12345678'
      )
    })

    it('should NOT render version info and link given production variables', () => {
      process.env.NODE_ENV = 'production'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_PROJECT_URL = 'https://localhost/pvac/pvweb'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'

      const stubs = { NuxtLink: RouterLinkStub }
      const wrapper = shallowMount(Footer, { stubs, localVue })

      const textLink = wrapper.findComponent(TextLink)

      expect(textLink.exists()).toBeFalsy()
    })
  })
})
