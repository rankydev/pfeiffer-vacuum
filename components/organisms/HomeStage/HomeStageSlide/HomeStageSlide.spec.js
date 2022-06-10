import { createLocalVue, shallowMount } from '@vue/test-utils'
import HomeStageSlide from './HomeStageSlide'
import HomeStageSlideContent from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent'
import Bubble from '~/components/molecules/Bubble/Bubble'
import { homeStageSlideContent } from './HomeStageSlide.stories.content'

const nuxtImg = {
  template: '<div>some image</div>',
  props: ['src', 'modifiers', 'title', 'alt', 'provider'],
}

const defaultProps = () => JSON.parse(JSON.stringify(homeStageSlideContent))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: nuxtImg }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(HomeStageSlide, options)
}

describe('HomeStageSlide', () => {
  describe('initial state', () => {
    test('should render whole component', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const homeStageSlideWrapper = wrapper.find('.home-stage-slide')
      expect(homeStageSlideWrapper.exists()).toBeTruthy()
    })

    // stageContent
    test('should render stageContent when it is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const contentElement = wrapper.findComponent(HomeStageSlideContent)
      expect(contentElement.vm.richtext[0].richtext).toEqual(
        propsData.stageContent[0].richtext[0].richtext
      )
      expect(contentElement.vm.headline).toEqual(
        propsData.stageContent[0].headline
      )
    })

    // interlay image
    test('should render an interlay image ', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const interlayImageWrapper = wrapper.findComponent(nuxtImg)

      expect(interlayImageWrapper.vm.src).toEqual(
        propsData.interlay.originalFilename
      )
    })

    // background image
    test('should render background image', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const homeStageWrapper = wrapper.find('.home-stage-slide')

      expect(homeStageWrapper.element.style.backgroundImage).toBe(
        `url(${propsData.image.originalFilename})`
      )
    })

    // bubble
    test('should render Bubble when it is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const bubbleElement = wrapper.findComponent(Bubble)

      expect(bubbleElement.vm.title).toEqual(propsData.bubble[0].title)
      expect(bubbleElement.vm.richtext).toEqual(propsData.bubble[0].richtext)
      expect(bubbleElement.vm.position).toEqual(propsData.bubble[0].position)
    })
  })
})
