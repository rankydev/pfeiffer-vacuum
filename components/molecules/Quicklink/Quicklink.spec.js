import { shallowMount } from '@vue/test-utils'
import Quicklink from './Quicklink.vue'

describe('Quicklink', () => {
  describe('initial state', () => {
    describe('given a link item', () => {
      it('should render', () => {
        const propsData = {
          anchor: 'testAnchor',
        }
        const slots = {
          default: 'lorem ipsum',
        }
        const wrapper = shallowMount(Quicklink, { propsData, slots })

        const link = wrapper.find('link-stub')

        expect(link.attributes('href')).toBe('#' + propsData.anchor)
        expect(link.attributes('target')).toBe('_self')
        expect(link.text()).toBe(slots.default)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
