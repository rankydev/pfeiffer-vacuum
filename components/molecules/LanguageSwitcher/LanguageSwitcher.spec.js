import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import InternalBtnWrapper from '~/components/molecules/InternalBtnWrapper/InternalBtnWrapper.vue'

const mockIsStoryblok = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useRoute: () => {
      return {
        value: {
          query: {
            _storyblok: mockIsStoryblok(),
          },
        },
      }
    },
    useContext: () => {
      return {
        $cms: {
          accessToken: '1234567890',
        },
        $config: {
          NODE_ENV: 'production',
        },
      }
    },
  }
})

describe('LanguageSwitcher', () => {
  const stubs = { NuxtLink: true }
  describe('initial state', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('should render properly', () => {
      mockIsStoryblok.mockReturnValue(false)
      const wrapper = shallowMount(LanguageSwitcher, { stubs })
      const languageSwitcher = wrapper.find('.language-switcher')
      const languageSwitcherWrapper = wrapper.find(
        '.language-switcher__wrapper'
      )
      const languageSwitcherContent = wrapper.find(
        '.language-switcher__content'
      )
      const button = wrapper.findComponent(InternalBtnWrapper)

      expect(languageSwitcher.exists()).toBeTruthy()
      expect(languageSwitcherWrapper.exists()).toBeTruthy()
      expect(languageSwitcherContent.exists()).toBeFalsy()
      expect(button.exists()).toBeTruthy()
    })
  })

  // describe('during interaction', () => {
  // TODO: this test is supposed to be implemented later
  // it('should switch language properly', () => {})
  // it('should open menu properly', async () => {})
  // it('should close menu properly', async () => {})
  // })

  // describe('business requirements', () => {})
})
