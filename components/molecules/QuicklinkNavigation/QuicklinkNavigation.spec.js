import { shallowMount } from '@vue/test-utils'
import QuicklinkNavigation from './QuicklinkNavigation.vue'
import { quicklinks } from './QuicklinkNavigation.stories.content'

describe('QuicklinkNavigation', () => {
  describe('initial state', () => {
    describe('given a list of quicklink items', () => {
      it('should render', () => {
        const propsData = {
          quicklinks,
        }
        const wrapper = shallowMount(QuicklinkNavigation, { propsData })
        const links = wrapper.findAll('quicklink-stub')

        quicklinks.forEach((item, index) => {
          expect(links.at(index).attributes('anchor')).toBe(
            quicklinks[index].anchor
          )
          expect(links.at(index).text()).toBe(quicklinks[index].label)
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
