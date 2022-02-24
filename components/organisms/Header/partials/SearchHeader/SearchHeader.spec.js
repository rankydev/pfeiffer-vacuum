import { shallowMount } from '@vue/test-utils'
import SearchHeader from './SearchHeader.vue'

describe('SearchHeader', () => {
  describe('initial state', () => {
    it('should set opacity class when hasOpacity true', () => {
      const propsData = { hasOpacity: true }
      const wrapper = shallowMount(SearchHeader, { propsData })

      const searchHeader = wrapper.find('.search-header')

      expect(searchHeader.attributes('class')).toMatch('search-header--opacity')
    })

    it('should not set opacity class when hasOpacity false', () => {
      const propsData = { hasOpacity: false }
      const wrapper = shallowMount(SearchHeader, { propsData })

      const searchHeader = wrapper.find('.search-header')

      expect(searchHeader.attributes('class')).not.toMatch(
        'search-header--opacity'
      )
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})