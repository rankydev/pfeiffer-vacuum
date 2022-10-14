import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Button from '~/components/atoms/Button/Button.vue'

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
  }
})

describe('LanguageSwitcher', () => {
  describe('initial state', () => {
    const stubs = { NuxtLink: true }
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
      const button = wrapper.findComponent(Button)

      expect(languageSwitcher.exists()).toBeTruthy()
      expect(languageSwitcherWrapper.exists()).toBeTruthy()
      expect(languageSwitcherContent.exists()).toBeFalsy()
      expect(button.exists()).toBeTruthy()
    })

    it('should render properly in storyblok preview', () => {
      mockIsStoryblok.mockReturnValue(true)
      const wrapper = shallowMount(LanguageSwitcher, { stubs })
      const languageSwitcher = wrapper.find('.language-switcher')
      const languageSwitcherWrapper = wrapper.find(
        '.language-switcher__wrapper'
      )
      const languageSwitcherContent = wrapper.find(
        '.language-switcher__content'
      )
      const button = wrapper.findComponent(Button)

      expect(languageSwitcher.exists()).toBeTruthy()
      expect(languageSwitcherWrapper.exists()).toBeFalsy()
      expect(languageSwitcherContent.exists()).toBeFalsy()
      expect(button.exists()).toBeFalsy()
    })
  })

  describe('during interaction', () => {
    // TODO: this test is supposed to be implemented later
    it('should switch language properly', () => {})

    it('should open menu properly', () => {})

    it('should close menu properly', () => {})
  })

  // describe('business requirements', () => {})
})
