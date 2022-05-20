import { createLocalVue, shallowMount } from '@vue/test-utils'
import HomeStageCarouselContent from './HomeStageCarousel.stories.content'
import HomeStageCarousel from './HomeStageCarousel'

let wrapper

const nuxtDynamicStub = {
  template: '<div />',
}

function createComponent(propsData = {}) {
  const stubs = {
    Template: true,
  }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(HomeStageCarousel, options)
}

// all other test scenarios are covered by the Carousel tests, as well as the
// tests provided for the HomeStageModule and Content partials
describe('HomeStageCarousel', () => {
  describe('initial state', () => {
    test('should render HomeStageCarousel', () => {
      createComponent({ slides: HomeStageCarouselContent.slides })

      const homeStageCarouselWrapper = wrapper.find('.home-stage-carousel')

      expect(homeStageCarouselWrapper).toBeTruthy()
    })
  })
})
