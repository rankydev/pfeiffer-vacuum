import { createLocalVue, shallowMount } from '@vue/test-utils'
import Stage from './Stage'
import StageContent from '~/components/molecules/Stage/StageContent/StageContent'
import content from './Stage.stories.content'

const localVue = createLocalVue()
localVue.directive('editable', (el, key) => {
  el.innerText = key.value
})

let wrapper

function createComponent(propsData = {}) {
  const stubs = { NuxtImg: true }
  wrapper = shallowMount(Stage, { propsData, localVue, stubs })
}

describe('Stage', () => {
  describe('initial state', () => {
    it('should still render when no data was given', () => {
      createComponent()
      expect(wrapper.exists()).toBeTruthy()
    })

    describe('given an image only', () => {
      beforeAll(() => createComponent({ image: content.image }))

      it('should not render a StageContent component', () => {
        const domStageContent = wrapper.findComponent(StageContent)

        expect(domStageContent.exists()).toBeFalsy()
      })

      it('should render a NuxtImg component and provide correct data', () => {
        const nuxtImg = wrapper.find('.stage__image')

        expect(nuxtImg.attributes('alt')).toBe(content.image.alt)
        expect(nuxtImg.attributes('src')).toBe(content.image.originalFilename)
      })

      it('should add the full class modifier to the NuxtImg component', () => {
        const nuxtImg = wrapper.find('.stage__image')

        expect(nuxtImg.attributes('class')).toMatch('stage__image--full')
      })
    })

    describe('given an image and stageContent', () => {
      beforeAll(() => createComponent(content))

      it('should render a StageContent component and provide correct data', () => {
        const stageContent = content.stageContent[0]
        const domStageContent = wrapper.findComponent(StageContent)

        expect(domStageContent.exists()).toBeTruthy()
        expect(domStageContent.vm.headline).toBe(stageContent.headline)
        expect(domStageContent.vm.subline).toBe(stageContent.subline)
        expect(domStageContent.vm.teaserText).toBe(stageContent.teaserText)
        expect(domStageContent.vm.buttons).toEqual(stageContent.buttons)
      })

      it('should render a NuxtImg component and provide correct data', () => {
        const nuxtImg = wrapper.find('.stage__image')

        expect(nuxtImg.attributes('alt')).toBe(content.image.alt)
        expect(nuxtImg.attributes('src')).toBe(content.image.originalFilename)
      })

      it('should add the with-text class modifier to the NuxtImg component', () => {
        const nuxtImg = wrapper.find('.stage__image')

        expect(nuxtImg.attributes('class')).toMatch('stage__image--with-text')
      })
    })
  })
})
