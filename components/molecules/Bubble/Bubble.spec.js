import { createLocalVue, shallowMount } from '@vue/test-utils'
import Bubble from './Bubble'
// import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent'
// import content from './Bubble.stories.content'

// const defaultProps = () => JSON.parse(JSON.stringify(content))

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: true }
  const localVue = createLocalVue()
  const editable = (el, key) => (el.innerText = key.value)
  localVue.directive('editable', editable)

  const options = {
    localVue,
    stubs,
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
  })
})
