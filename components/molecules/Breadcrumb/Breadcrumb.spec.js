import { shallowMount } from '@vue/test-utils'
import Breadcrumb from '~/components/molecules/Breadcrumb/Breadcrumb.vue'
import { entries } from './Breadcrumb.stories.content.js'

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(Breadcrumb, { propsData })
}

describe('Breadcrumb', () => {
  describe('initial state', () => {
    it('should render breadcrumb with given entries', () => {
      createComponent({ entries })

      const domEntries = wrapper.findAll('li')
      const links = wrapper.findAll('link-stub')
      const lastElement = wrapper.find('span')

      expect(domEntries.length).toBe(entries.length)

      links.wrappers.forEach((link, idx) => {
        expect(link.attributes('href')).toBe(entries[idx].href)
        expect(link.text()).toBe(entries[idx].name)
        expect(link.attributes('variant')).toBe('breadcrumb')
      })

      expect(lastElement.attributes('href')).toBe(undefined)
      expect(lastElement.text()).toBe(entries[entries.length - 1].name)
      expect(lastElement.attributes('variant')).toBe(undefined)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
