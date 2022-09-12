import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import ResultHeadline from './ResultHeadline'
import resultHeadlineContent from './ResultHeadline.stories.content'

let wrapper

function createComponent(propsData = {}, { CustomStub } = {}) {
  const stubs = { NuxtLink: CustomStub || RouterLinkStub }
  wrapper = shallowMount(ResultHeadline, { propsData, stubs })
}

describe('ResultHeadline', () => {
  describe('initial state', () => {
    it('should render component given only headline', () => {
      const propsData = { headline: resultHeadlineContent.headline }
      createComponent(propsData)

      const domElement = wrapper.find('.result-headline')
      const domLink = wrapper.find('.result-headline__link')
      const domHeadline = wrapper.find('.result-headline__headline')
      const domCount = wrapper.find('.result-headline__resultCount')

      expect(domElement.exists()).toBeTruthy()
      expect(domLink.exists()).toBeFalsy()
      expect(domHeadline.exists()).toBeTruthy()
      expect(domCount.exists()).toBeFalsy()
    })

    it('should render all given props', () => {
      const propsData = resultHeadlineContent
      createComponent(propsData)

      const domHeadline = wrapper.find('.result-headline__headline')
      const domCount = wrapper.find('.result-headline__resultCount')

      expect(domHeadline.text()).toBe(resultHeadlineContent.headline)
      expect(domCount.text()).toBe(`(${resultHeadlineContent.resultCount})`)

      const link = wrapper.findComponent(RouterLinkStub)
      expect(link.exists()).toBeTruthy()
      expect(link.vm.to).toBe(resultHeadlineContent.link)
    })
  })
})
