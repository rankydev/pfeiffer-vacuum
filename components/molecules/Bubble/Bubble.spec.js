import { createLocalVue, shallowMount } from '@vue/test-utils'
import Bubble from './Bubble'
import { bubble } from '~/components/organisms/HomeStageModule/HomeStageModule.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify(bubble[0]))

let wrapper

function createComponent(propsData = {}) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
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
      }
      createComponent(propsData)
      const bubbleHeadline = wrapper.find('.bubble__headline')
      const bubbleRichtext = wrapper.find('.bubble__richtext')
      // checking default position (right)
      const bubblePosition = wrapper.find('.bubble__wrapper--right')
      expect(bubbleHeadline.text()).toEqual(propsData.title)
      expect(bubbleRichtext.html()).toContain(propsData.richtext)
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
  })
})
