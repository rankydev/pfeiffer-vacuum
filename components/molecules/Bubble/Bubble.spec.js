import { createLocalVue, shallowMount } from '@vue/test-utils'
import Bubble from './Bubble'
import { bubble } from '@/components/organisms/HomeStage/HomeStageSlide/HomeStageSlide.stories.content'
import { bubbleText } from '~/components/atoms/Richtext/Richtext.stories.content.js'

const defaultProps = () => JSON.parse(JSON.stringify(bubble[0]))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
    stubs,
  }

  wrapper = shallowMount(Bubble, options)
}

describe('Bubble', () => {
  describe('initial state', () => {
    test('should still render when no data was given', () => {
      createComponent()
      const homeStageContentWrapper = wrapper.find('.bubble__wrapper')
      expect(homeStageContentWrapper.exists()).toBeTruthy()
    })
    // content
    test('should render correct data given propsData', () => {
      const propsData = {
        ...defaultProps(),
        bubbleText,
      }
      createComponent(propsData, false)
      const bubbleHeadline = wrapper.find('.bubble__headline')
      const domRichtext = wrapper.find('[name="Richtext"]')

      // checking default position (right)
      const bubblePosition = wrapper.find('.bubble__wrapper--right')
      expect(bubbleHeadline.text()).toEqual(propsData.title)
      expect(domRichtext.attributes('richtext')).toBe(bubbleText.richtext)
      expect(bubblePosition.exists()).toBeTruthy()
    })
    // position left
    test('should render bubble left given position attribute left', () => {
      const propsData = {
        ...defaultProps(),
        position: 'left',
      }
      createComponent(propsData)
      const bubblePosition = wrapper.find('.bubble__wrapper--left')
      expect(bubblePosition.exists()).toBeTruthy()
    })
    // fallback component
    test('should use fallback component name given no uiComponentKey', () => {
      const propsData = {
        ...defaultProps(),
      }
      delete propsData.richtext[0].uiComponent
      createComponent(propsData)
      const domRichtext = wrapper.find('[name="RichtextBasic"]')
      expect(domRichtext.exists()).toBeTruthy()
    })
  })
})
