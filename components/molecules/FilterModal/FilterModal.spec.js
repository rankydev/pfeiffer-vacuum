import { shallowMount } from '@vue/test-utils'
import FilterModal from './FilterModal.vue'

const mockIsMobile = jest.fn()
jest.mock('@nuxtjs/composition-api', () => {
  const originalModule = jest.requireActual('@nuxtjs/composition-api')
  return {
    __esModule: true,
    ...originalModule,
    useContext: () => {
      return {
        app: {
          $breakpoints: {
            isMobile: mockIsMobile(),
          },
        },
      }
    },
  }
})

describe('FilterModal', () => {
  describe('initial state', () => {
    test('should render given no props for desktop', () => {
      mockIsMobile.mockReturnValue(false)
      const wrapper = shallowMount(FilterModal, {
        slots: { default: '<div class="test-content"/>' },
      })
      expect(wrapper.find('.test-content').exists()).toBeTruthy()
      expect(wrapper.find('.filter-modal__open-button').exists()).toBeFalsy()
      expect(wrapper.find('.filter-modal__content').exists()).toBeFalsy()
    })

    test('should render given no props for mobile', () => {
      mockIsMobile.mockReturnValue(true)
      const wrapper = shallowMount(FilterModal, {
        slots: { default: '<div class="test-content"/>' },
      })
      expect(wrapper.find('.test-content').exists()).toBeTruthy()
      expect(wrapper.find('.filter-modal__open-button').exists()).toBeTruthy()
      expect(wrapper.find('.filter-modal__content').exists()).toBeTruthy()
    })
  })
  // describe('during interaction', () => {})
})
