import { useStoryblokProvider } from './storyblokProvider.js'
import responsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'

const imgMock = jest.fn((src, modifications, options) => {
  // console.log(src, modifications, options, '------> TEST')
  return src
})

const modifiers = computed(() => ({
  filters: {
    focal: props.image.focus,
    grayscale: props.blackAndWhite ? '' : false,
  },
}))

describe('StoryblokProvider', () => {
  describe('initial state', () => {
    test('should render src and alt with empty String, when no image provided', () => {
      const storyblokProvider = useStoryblokProvider({ $img: imgMock })
      const image = storyblokProvider.buildImage({
        image: responsiveImage.image,
        aspectRatio: '1:1',
      })
      console.log(image, 'IMAGE')
      expect(image.src.value).toBe(responsiveImage.image.originalFilename)
      expect(image.alt.value).toBe(responsiveImage.image.alt)
      expect(image.title.value).toBe(responsiveImage.image.title)
      expect(image.modifiers.value).toBe(modifiers)
      // expect(image.webpSources.value).toBe(responsiveImage.image.)
      // expect(image.pngSources.value).toBe(responsiveImage.image.)
    })
  })
  describe('initial state', () => {
    test('should render src and alt with empty String, when no image provided', () => {
      const storyblokProvider = useStoryblokProvider({ $img: imgMock })
      const image = storyblokProvider.buildImage({
        image: responsiveImage.image,
        aspectRatio: '1:1',
      })

      console.log(image.webpSources.value)

      // expect(imgMock).toBeCalledTimes(4)
      // expect(imgMock).toBeCalledWidth()
      //   expect(image.src.value).toBe('')
      //   expect(image.alt.value).toBe('')
      //   expect(image.title.value).toBe('')
    })
  })
})
