import { shallowMount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'
import InputField from '~/components/atoms/InputField/InputField.vue'

describe('SearchInput', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render', () => {
        const wrapper = shallowMount(SearchInput)

        const inputField = wrapper.findComponent(InputField)

        expect(inputField.vm.icon).toBe('search')
        expect(inputField.vm.placeholder).toBe('form.input.search.placeholder')
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
