import { shallowMount } from '@vue/test-utils'
import { ref } from '@nuxtjs/composition-api'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Button from '~/components/atoms/Button/Button.vue'

const mockIsStoryblok = ref(false)

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useRoute: () => {
      return {
        value: {
          query: {
            _storyblok: mockIsStoryblok.value,
          },
        },
      }
    },
  }
})

describe('LanguageSwitcher', () => {
  describe('initial state', () => {
    const stubs = { NuxtLink: true }
    it('should render properly', () => {
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
      expect(languageSwitcherContent.exists()).toBeTruthy()
      expect(button.exists()).toBeTruthy()
    })

    it('should render properly in storyblok preview', () => {
      mockIsStoryblok.value = true
      const wrapper = shallowMount(LanguageSwitcher, { stubs })
      const languageSwitcher = wrapper.find('.language-switcher')
      const languageSwitcherWrapper = wrapper.find(
        '.language-switcher__wrapper'
      )

      expect(languageSwitcher.exists()).toBeTruthy()
      expect(languageSwitcherWrapper.exists()).toBeFalsy()
    })
  })

  describe('during interaction', () => {
    // TODO: this test is supposed to be implemented later
    it('should switch language properly', () => {})
  })

  // describe('business requirements', () => {})
})
