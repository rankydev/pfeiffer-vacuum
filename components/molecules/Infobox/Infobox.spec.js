import { shallowMount } from '@vue/test-utils'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Infobox from './Infobox.vue'

let wrapper

function createComponent() {
  wrapper = shallowMount(Infobox)
}

describe('Infobox', () => {
  describe('initial state', () => {
    it('component should initially provide icon and text', () => {
      createComponent()
      const domText = wrapper.find('.infobox__content__text')
      const domIcon = wrapper.findComponent(Icon)

      expect(domText).toBeTruthy()
      expect(domIcon.vm.icon).toMatch('info')
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
