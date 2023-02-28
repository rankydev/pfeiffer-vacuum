import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import Footer from './Footer'
import SocialMedia from '~/components/molecules/SocialMedia/SocialMedia'
import Link from '~/components/atoms/Link/Link'

let mockConfig = {}

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => ({
      $config: mockConfig,
    }),
  }
})

describe('Footer', () => {
  let wrapper

  function createComponent() {
    wrapper = shallowMount(Footer, {
      propsData: {},
      stubs: {
        NuxtDynamic: true,
        NuxtLink: RouterLinkStub,
      },
    })
  }

  describe('initial state', () => {
    it('should render all partials', () => {
      mockConfig = {}

      createComponent()

      const socialMedia = wrapper.findComponent(SocialMedia)
      const textLink = wrapper.findComponent(Link)

      expect(socialMedia.exists()).toBeTruthy()
      expect(textLink.exists()).toBeFalsy()
    })

    it('should render version info and link given development variables', () => {
      mockConfig = {
        NODE_ENV: 'development',
        CI_COMMIT_SHORT_SHA: '12345678',
        CI_COMMIT_REF_NAME: 'test_version_info',
        CI_PROJECT_URL: 'https://localhost/pvac/pvweb',
      }

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
      mockConfig = {
        CI_COMMIT_SHORT_SHA: '12345678',
        CI_COMMIT_REF_NAME: 'test_version_info',
      }

      createComponent()

      const textLink = wrapper.findComponent(Link)

      expect(textLink.exists()).toBeFalsy()
    })
  })
})
