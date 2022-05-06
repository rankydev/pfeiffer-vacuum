import { shallowMount } from '@vue/test-utils'
import Breadcrumb from '~/components/molecules/Breadcrumb/Breadcrumb.vue'
import { breadcrumb } from './Breadcrumb.stories.content.js'
import { expect } from '@jest/globals'

const getBreadcrumb = () => JSON.parse(JSON.stringify(breadcrumb))

jest.mock('~/stores/cms', () => {
  const { breadcrumb } = require('./Breadcrumb.stories.content.js')

  return {
    __esModule: true,
    useCmsStore: () => ({ breadcrumb }),
  }
})

let wrapper

function createComponent(propsData = {}) {
  wrapper = shallowMount(Breadcrumb, { propsData })
}

describe('Breadcrumb', () => {
  describe('initial state', () => {
    it('should render breadcrumb with given entries', () => {
      createComponent()

      const entries = wrapper.findAll('li')
      const links = wrapper.findAll('link-stub')
      const lastElement = wrapper.find('span')

      expect(entries.length).toBe(breadcrumb.length)

      links.wrappers.forEach((link, idx) => {
        expect(link.attributes('href')).toBe(breadcrumb[idx].href)
        expect(link.text()).toBe(breadcrumb[idx].name)
        expect(link.attributes('variant')).toBe('breadcrumb')
      })

      expect(lastElement.attributes('href')).toBe(undefined)
      expect(lastElement.text()).toBe(getBreadcrumb().pop().name)
      expect(lastElement.attributes('variant')).toBe(undefined)
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
