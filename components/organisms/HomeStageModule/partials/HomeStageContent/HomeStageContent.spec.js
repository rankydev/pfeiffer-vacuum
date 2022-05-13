import { createLocalVue, shallowMount } from '@vue/test-utils'
import Button from '~/components/atoms/Button/Button'
// import HomeStageContent from './HomeStageContent'
import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent'
import content from './HomeStageContent.stories.content'

// import content from './HomeStageModule.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify(content))

let wrapper

function createComponent(propsData = {}) {
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    propsData,
  }

  wrapper = shallowMount(HomeStageContent, options)
}

describe('HomeStageContent', () => {
  describe('initial state', () => {
    test('should still render when no data was given', () => {
      createComponent()
      const homeStageContentWrapper = wrapper.find('.homestage-content')
      expect(homeStageContentWrapper.exists()).toBeTruthy()
    })

    // headline
    test('should render headline given propsData', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const contentHeadline = wrapper.find('.homestage-content__headline')
      expect(contentHeadline.text()).toBe(propsData.headline)
    })

    // teaserText
    test('should render teaserText given propsData', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const contentHeadline = wrapper.find('.homestage-content__description')
      expect(contentHeadline.text()).toBe(propsData.teaserText)
    })

    // buttons
    test('should render button given propsData', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)

      const buttonArr = wrapper.findAllComponents(Button)
      buttonArr.wrappers.forEach((item, idx) => {
        expect(item.attributes('icon')).toBe(propsData.buttons[idx].icon)
      })
    })
  })
})
