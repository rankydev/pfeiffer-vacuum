import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Button from '~/components/atoms/Button/Button.vue'

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useRoute: () => {
      return { value: { fullPath: '/de' } }
    },
  }
})

describe('LanguageSwitcher', () => {
  describe('initial state', () => {
    it('should render', () => {
      const wrapper = shallowMount(LanguageSwitcher)

      const languageSwitcher = wrapper.find('.language-switcher')
      const button = wrapper.findComponent(Button)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
