import { createLocalVue, RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import Link from '~/components/atoms/Link/Link'
import newsletterContent from './partials/FooterNewsletter/FooterNewsletter.stories.content'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true, NuxtLink: RouterLinkStub }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
    stubs,
  }
  wrapper = shallowMount(Footer, options)
}

describe('Footer', () => {
  describe('initial state', () => {
    it('should render all partials', () => {
      const propsData = { newsletter: [newsletterContent] }
      createComponent(propsData)

      const socialMedia = wrapper.findComponent(SocialMedia)
      const footerNewsletter = wrapper.find('[component="FooterNewsletter"]')

      expect(socialMedia.exists()).toBeTruthy()
      expect(footerNewsletter.exists()).toBeTruthy()
    })

    it('should render version info and link given development variables', () => {
      process.env.NODE_ENV = 'development'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'
      process.env.CI_PROJECT_URL = 'https://localhost/pvac/pvweb'

      createComponent()

      const textLink = wrapper.findComponent(Link)

      expect(textLink.exists()).toBeTruthy()
      // not textLink.text() because of shallowMount, thus only stub with attributes available
      expect(textLink.attributes('label')).toBe(
        'Version: test_version_info/12345678'
      )
      expect(textLink.attributes('variant')).toBe('textlink')
    })

    it('should NOT render version info and link given production variables', () => {
      process.env.NODE_ENV = 'production'
      process.env.CI_COMMIT_SHORT_SHA = '12345678'
      process.env.CI_PROJECT_URL = 'https://localhost/pvac/pvweb'
      process.env.CI_COMMIT_REF_NAME = 'test_version_info'

      createComponent()

      const textLink = wrapper.findComponent(Link)

      expect(textLink.exists()).toBeFalsy()
    })
  })
})
