import { shallowMount, createLocalVue } from '@vue/test-utils'
import QuicklinkNavigation from './QuicklinkNavigation.vue'
import { quicklinkNavigation } from './QuicklinkNavigation.stories.content'

const { quicklinks } = quicklinkNavigation

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('QuicklinkNavigation', () => {
  describe('initial state', () => {
    describe('given a list of quicklink items', () => {
      it('should render', () => {
        const propsData = {
          quicklinks,
        }
        const wrapper = shallowMount(QuicklinkNavigation, {
          propsData,
          localVue,
        })
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
