import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import OnPageNavigation from './OnPageNavigation'
import { quicklinks } from './OnPageNavigation.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

describe('OnPageNavigation', () => {
  describe('initial state', () => {
    describe('given no items', () => {
      it('should render', () => {
        const wrapper = shallowMount(OnPageNavigation)

        expect(
          wrapper.find('quicklinknavigation-stub').attributes('quicklinks')
        ).toHaveLength(0)
      })
    })
    describe('given a list of quicklink items', () => {
      it('should render', () => {
        const propsData = {
          quicklinks,
        }
        const wrapper = mount(OnPageNavigation, { propsData, localVue })
        const links = wrapper.findAll('a')

        expect(wrapper.find('quicklink-navigation')).toBeTruthy()
        expect(links).toHaveLength(quicklinks.length)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
