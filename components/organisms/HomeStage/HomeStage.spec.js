import { createLocalVue, shallowMount } from '@vue/test-utils'
import HomeStageContent, {
  homeStageSingleSlideContent,
} from './HomeStage.stories.content'
import HomeStage from './HomeStage'

let wrapper

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

  wrapper = shallowMount(HomeStage, options)
}

// all other test scenarios are covered by the Carousel tests, as well as the
// tests provided for the HomeStageSlide and HomeStageSlideContent(in the partials)
describe('HomeStage', () => {
  describe('initial state', () => {
    test('should render HomeStage with no slide', () => {
      createComponent({ slides: [] })
      const homeStageWrapper = wrapper.find('.home-stage')
      expect(homeStageWrapper).toBeTruthy()
    })
    test('should render HomeStage with one single slide', () => {
      createComponent({ slides: homeStageSingleSlideContent.slides })
      const homeStageWrapper = wrapper.find('.home-stage')
      expect(homeStageWrapper).toBeTruthy()
    })
    test('should render HomeStage with several slides', () => {
      createComponent({ slides: HomeStageContent.slides })
      const homeStageWrapper = wrapper.find('.home-stage')
      expect(homeStageWrapper).toBeTruthy()
    })
  })
})
