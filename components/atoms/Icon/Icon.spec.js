import { shallowMount } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render the icon name as text', () => {
        const propsData = { icon: 'someIcon' }
        const wrapper = shallowMount(Icon, { propsData })

        expect(wrapper.text()).toBe(propsData.icon)
      })
    })

    describe('given any valid size prop', () => {
      it('should render the size prop as a class', () => {
        ;['small', 'base', 'large'].forEach((size) => {
          const propsData = { icon: 'someIcon', size }
          const wrapper = shallowMount(Icon, { propsData })

          expect(wrapper.attributes('class')).toMatch(`icon-${size}`)
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})