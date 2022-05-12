import { createLocalVue, shallowMount } from '@vue/test-utils'
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
    test('should render headline', () => {
      const propsData = {
        ...defaultProps(),
      }
      createComponent(propsData)
      const homeStageContentWrapper = wrapper.find('.homestage-content')
      console.log(homeStageContentWrapper)
      // // console.log(homeStageContentWrapper.at(0).attributes('headline'))
      // // console.log(homeStageContentWrapper.vm)
      // // console.log(homeStageContentWrapper.attributes('headline'))
      // // console.log(propsData[0].headline)
      // const headline = propsData[0].headline
      // const headlineWrapper = homeStageContentWrapper.find(
      //   '.homestage-content__headline'
      // )
      // console.log(headlineWrapper)
      // expect(headlineWrapper.exists()).toBeTruthy()
      // console.log(homeStageContentWrapper)
      // expect(homeStageContentWrapper.exists()).toBeTruthy()
    })

    // teaserText

    // position
  })
})
