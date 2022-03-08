import { shallowMount } from '@vue/test-utils'
import Icon from '~/components/atoms/Icon/Icon.vue'

let wrapper

function createComponent(propsData = {}) {
  const stubs = { SvgIcon: true }
  wrapper = shallowMount(Icon, { propsData, stubs })
}

describe('Icon', () => {
  describe('initial state', () => {
    describe('given an icon', () => {
      it('should render the icon name as text', () => {
        const propsData = { icon: 'someIcon' }
        createComponent(propsData)

        expect(wrapper.text()).toBe(propsData.icon)
      })
    })

    describe('given any valid size prop', () => {
      it('should render the size prop as a class', () => {
        ;['small', 'base', 'large'].forEach((size) => {
          const propsData = { icon: 'someIcon', size }
          createComponent(propsData)

          expect(wrapper.attributes('class')).toMatch(`icon--${size}`)
        })
      })
    })

    describe('given custom svg name', () => {
      it('should render svg-icon component with correct name', () => {
        const propsData = { type: 'svg', icon: 'someIcon' }
        createComponent(propsData)

        expect(wrapper.find('.icon__svg').attributes('name')).toBe(
          propsData.icon
        )
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
