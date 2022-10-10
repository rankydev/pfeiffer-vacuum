import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Button from '~/components/atoms/Button/Button.vue'

describe('LanguageSwitcher', () => {
  describe('initial state', () => {
    it('should render properly', () => {
      const stubs = { NuxtLink: true }
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
  })

  describe('during interaction', () => {
    // TODO: this test is supposed to be implemented later
    it('should switch language properly', () => {})
  })

  // describe('business requirements', () => {})
})
