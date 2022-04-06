import { shallowMount } from '@vue/test-utils'
import VideoPlayer from '~/components/atoms/VideoPlayer/VideoPlayer.vue'
import { title, description } from './VideoPlayer.stories.content.js'

let wrapper

const data = {
  icon: 'youtube',
  image: 'some image',
  sources: [{ srcset: 'some source' }],
  iframeAttributes: {
    src: 'some url',
    attribute: 'some attribute',
  },
}
const url = 'validYoutubeUrl'
const transparenPixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

jest.mock('./player/youtube.js', () => ({
  useYoutube: () => ({
    checkUrl: (newUrl) => newUrl === url,
    getData: () => data,
  }),
}))

function createComponent(propsData = {}) {
  const stubs = { NuxtDynamic: true }
  wrapper = shallowMount(VideoPlayer, { propsData, stubs })
}

describe('VideoPlayer', () => {
  describe('initial state', () => {
    it('should render a rich text component, given these as a description', () => {
      const propsData = { description }
      createComponent(propsData)

      const elements = wrapper.findAll('.video-player__component')

      expect(elements.length).toBe(description.length)

      description.forEach((ele, idx) => {
        expect(elements.at(idx).attributes('component')).toBe(
          ele.uiComponent || ele.component
        )
      })
    })

    describe('given no url', () => {
      it('should render an empty image pixel', () => {
        createComponent()

        const image = wrapper.find('.video-player__preview')
        expect(image.attributes('src')).toBe(transparenPixel)
      })

      it('should add the title as an alt tag to the image given a title', () => {
        const propsData = { title }
        createComponent(propsData)

        const image = wrapper.find('.video-player__preview')
        expect(image.attributes('alt')).toBe(propsData.title)
      })
    })

    describe('given an youtube url', () => {
      it('should render a list of image sources', () => {
        const propsData = { url }
        createComponent(propsData)

        const sources = wrapper.findAll('source')

        sources.wrappers.forEach((source, idx) => {
          expect(source.attributes('srcset')).toBe(data.sources[idx].srcset)
        })
      })

      it('should render the peview image', () => {
        const propsData = { url }
        createComponent(propsData)

        const image = wrapper.find('.video-player__preview')
        expect(image.attributes('src')).toBe(data.image)
      })

      it('should add the title as an alt tag to the image given a title', () => {
        const propsData = { title, url }
        createComponent(propsData)

        const image = wrapper.find('.video-player__preview')
        expect(image.attributes('alt')).toBe(propsData.title)
      })
    })
  })

  describe('during interaction', () => {
    describe('given an youtube url', () => {
      it('should replace the preview image with an iframe', async () => {
        const propsData = { title, url }
        createComponent(propsData)

        const video = wrapper.find('.video-player__inner')

        await video.trigger('click')

        const iframe = wrapper.find('iframe')

        expect(iframe.exists()).toBeTruthy()
      })

      it('should add all nessary attributes to the ifram', () => {
        const iframe = wrapper.find('iframe')

        expect(iframe.attributes('src')).toBe(data.iframeAttributes.src)
        expect(iframe.attributes('attribute')).toBe(
          data.iframeAttributes.attribute
        )
      })
    })
  })

  // describe('business requirements', () => {})
})
