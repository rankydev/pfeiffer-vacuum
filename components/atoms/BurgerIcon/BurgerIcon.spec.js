import { shallowMount } from '@vue/test-utils'
import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(BurgerIcon, { propsData })
}

describe('BurgerIcon', () => {
  describe('initial state', () => {
    it('should add an active class when isActive = true', () => {
      createComponent({ isActive: true })
      const classes = wrapper.attributes('class')
      expect(classes).toMatch('burger-icon--active')
    })
    it('should add no active class when isActive = false', () => {
      createComponent({ isActive: false })
      const classes = wrapper.attributes('class')
      expect(classes).not.toMatch('burger-icon--active')
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
