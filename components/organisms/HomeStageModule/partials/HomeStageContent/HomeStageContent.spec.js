import { createLocalVue, shallowMount } from '@vue/test-utils'
import HomeStageContent from './HomeStageContent'
// import HomeStageContent from '~/components/organisms/HomeStageModule/partials/HomeStageContent/HomeStageContent'
import content from './HomeStageContent.stories.content'

const defaultProps = () => JSON.parse(JSON.stringify(content))

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

  wrapper = shallowMount(HomeStageContent, options)
}

describe('HomeStageContent', () => {
  describe('initial state', () => {
    test('should still render when no data was given', () => {
      createComponent()
      const homeStageContentWrapper = wrapper.find('.homestage-content')
      expect(homeStageContentWrapper.exists()).toBeTruthy()
    })
  })
})
