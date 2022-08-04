import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  describe('initial state', () => {
    it('should render component given prop show=true', () => {
      const propsData = { show: true }
      const wrapper = shallowMount(LoadingSpinner, { propsData })
      const loadingSpinner = wrapper.find('.loading-spinner')
      const placeholder = wrapper.find('.loading-spinner__placeholder')
      const overlay = wrapper.find('.loading-spinner__overlay')
      const spinner = wrapper.find('.loading-spinner__spinner')

      expect(wrapper).toBeTruthy()
      expect(loadingSpinner).toBeTruthy()
      expect(placeholder).toBeTruthy()
      expect(overlay).toBeTruthy()
      expect(spinner).toBeTruthy()
    })
    it('should not render overlay given prop show=false', () => {
      const propsData = { show: false }
      const wrapper = shallowMount(LoadingSpinner, { propsData })

      expect(wrapper).toBeTruthy()
      expect(wrapper.html()).not.toContain('loading-spinner__overlay')
      expect(wrapper.html()).not.toContain('loading-spinner__spinner')
    })
  })
})
