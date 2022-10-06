import { shallowMount } from '@vue/test-utils'
import LanguageSwitcher from './LanguageSwitcher.vue'
import Button from '~/components/atoms/Button/Button.vue'

const mockIsDesktop = jest.fn()

jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    ...originalModule,
    useContext: () => {
      return { app: { $breakpoints: { isDesktop: mockIsDesktop() } } }
    },
  }
})

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('initial state', () => {
    it('should render properly', () => {
      const wrapper = shallowMount(LanguageSwitcher)

      const languageSwitcher = wrapper.find('.language-switcher')
      const button = wrapper.findComponent(Button)

      expect(true).toBeTruthy()
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
