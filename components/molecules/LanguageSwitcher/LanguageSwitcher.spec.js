import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

describe('LanguageSwitcher', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render', () => {
        const wrapper = shallowMount(LanguageSwitcher)

        const icon = wrapper.findComponent(Icon)
        const language = wrapper.find('.language-switcher__label')

        expect(icon.vm.icon).toBe('language')
        expect(language.text()).toBe('language.code')
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
