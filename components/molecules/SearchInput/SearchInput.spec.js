import { shallowMount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

describe('SearchInput', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render', () => {
        const wrapper = shallowMount(SearchInput)

        const inputField = wrapper.findComponent(PvInput)

        expect(inputField.vm.icon).toBe('search')
        expect(inputField.vm.placeholder).toBe('form.input.search.placeholder')
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
