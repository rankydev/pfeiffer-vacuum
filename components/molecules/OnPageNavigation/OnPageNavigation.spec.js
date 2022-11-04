import { shallowMount } from '@vue/test-utils'
import OnPageNavigation from './OnPageNavigation'
import { quicklinks } from './OnPageNavigation.stories.content'
import Breadcrumb from '~/components/molecules/Breadcrumb/Breadcrumb.vue'
import Link from '~/components/atoms/Link/Link.vue'

let wrapper

jest.mock('~/stores/page', () => {
  const { entries } = require('../Breadcrumb/Breadcrumb.stories.content.js')

  return {
    __esModule: true,
    usePageStore: () => ({ breadcrumb: entries }),
  }
})

function createComponent(propsData = {}) {
  wrapper = shallowMount(OnPageNavigation, { propsData })
}

describe('OnPageNavigation', () => {
  describe('initial state', () => {
    describe('given no items', () => {
      test('should render Breadcrumb only', () => {
        createComponent()

        const domBreadcrumb = wrapper.findComponent(Breadcrumb)
        const domQuickLinks = wrapper.findAllComponents(Link)

        expect(domBreadcrumb.exists()).toBeTruthy
        expect(domQuickLinks.length).toBe(0)
      })

      test('should render nothing when hideBreadcrumb true', () => {
        const propsData = { hideBreadcrumb: true }
        createComponent(propsData)

        expect(wrapper.html()).toBe('')
      })
    })

    describe('given a list of quicklink items', () => {
      it('should render all quicklinks', () => {
        const propsData = { quicklinks }
        createComponent(propsData)

        const domQuickLinks = wrapper.findAllComponents(Link)

        expect(domQuickLinks).toHaveLength(quicklinks.length)
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
