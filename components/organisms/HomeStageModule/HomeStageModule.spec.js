import { createLocalVue, shallowMount } from '@vue/test-utils'
import HomeStageModule from './HomeStageModule'
import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent'
import Bubble from '~/components/molecules/Bubble/Bubble'
import content from './HomeStageModule.stories.content'

const nuxtImg = {
  template: '<div>some image</div>',
  props: ['src', 'modifiers', 'title', 'alt', 'provider'],
}

const defaultProps = () => JSON.parse(JSON.stringify(content))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: nuxtImg }

  const $img = () => ''
  const mocks = { $nuxt: { context: { $img } } }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
    propsData,
  }

  wrapper = shallowMount(HomeStageModule, options)
}

describe('HomeStageModule', () => {
  describe('initial state', () => {
    test('should still render when no data was given', () => {
      createComponent()
      const homeStageWrapper = wrapper.find('.homestage')
      expect(homeStageWrapper.exists()).toBeTruthy()
    })

    // stageContent
    test('should render stageContent when it is provided', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const contentElement = wrapper.findComponent(HomeStageContent)
      expect(contentElement.vm.teaserText).toEqual(
        propsData.stageContent[0].teaserText
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
      const homeStageWrapper = wrapper.find('.homestage')

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
