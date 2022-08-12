import { createLocalVue, shallowMount } from '@vue/test-utils'
import ErrorImageStage from './ErrorImageStage'
import HomeStageSlideContent from '~/components/organisms/HomeStage/HomeStageSlide/partials/HomeStageSlideContent/HomeStageSlideContent'
import { errorStageContent } from './ErrorImageStage.stories.content'

const nuxtImg = {
  template: '<div>some image</div>',
  props: ['src', 'modifiers', 'title', 'alt', 'provider'],
}

const defaultProps = () => JSON.parse(JSON.stringify(errorStageContent))

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

  wrapper = shallowMount(ErrorImageStage, options)
}

describe('ErrorImageStage', () => {
  describe('initial state', () => {
    test('should render whole component', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const homeStageSlideWrapper = wrapper.find('.error-image-stage')
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
      const homeStageWrapper = wrapper.find('.error-image-stage')

      expect(homeStageWrapper.element.style.backgroundImage).toBe(
        `url(${propsData.image.originalFilename})`
      )
    })

    // stars
    test('should render stars on the stage', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const starsWrapper = wrapper.find('.night')
      expect(starsWrapper.exists()).toBeTruthy()
    })
  })
})
