import { useStoryblokProvider } from './storyblokProvider.js'
import responsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'

const imgMock = jest.fn((src) => {
  return src
})

const screenSizes = [
  ['sm', 0],
  ['md', 768],
  ['lg', 1280],
]

describe('StoryblokProvider', () => {
  describe('initial state', () => {
    describe('should return image attributes correctly', () => {
      test('given valid image', () => {
        const storyblokProvider = useStoryblokProvider({ $img: imgMock })
        const image = storyblokProvider.buildImage({
          image: responsiveImage.image,
          aspectRatio: '1:1',
        })

        const modifiers = {
          filters: {
            focal: null,
            grayscale: false,
          },
        }

        expect(image.src.value).toBe(responsiveImage.image.originalFilename)
        expect(image.alt.value).toBe(responsiveImage.image.alt)
        expect(image.title.value).toBe(responsiveImage.image.title)
        expect(image.modifiers.value).toStrictEqual(modifiers)
        screenSizes.forEach(([key, width], idx) => {
          expect(image.webpSources.value[idx]).toStrictEqual({
            key: key,
            media: `(min-width: ${width}px)`,
            srcset: `${responsiveImage.image.originalFilename} 1x, ${responsiveImage.image.originalFilename} 2x`,
          })
        })
        screenSizes.forEach(([key, width], idx) => {
          expect(image.pngSources.value[idx]).toStrictEqual({
            key: key,
            media: `(min-width: ${width}px)`,
            srcset: `${responsiveImage.image.originalFilename} 1x, ${responsiveImage.image.originalFilename} 2x`,
          })
        })
      })
    })

    test('given empty image object', () => {
      const storyblokProvider = useStoryblokProvider({ $img: imgMock })
      const image = storyblokProvider.buildImage({
        image: {},
        aspectRatio: '1:1',
      })

      const modifiersForEmptyImageObject = {
        filters: {
          focal: undefined,
          grayscale: false,
        },
      }

      expect(image.src.value).toBe('')
      expect(image.alt.value).toBe('')
      expect(image.title.value).toBe('')
      expect(image.modifiers.value).toStrictEqual(modifiersForEmptyImageObject)
      screenSizes.forEach(([key, width], idx) => {
        expect(image.webpSources.value[idx]).toStrictEqual({
          key: key,
          media: `(min-width: ${width}px)`,
          srcset: ' 1x,  2x',
        })
      })
      screenSizes.forEach(([key, width], idx) => {
        expect(image.pngSources.value[idx]).toStrictEqual({
          key: key,
          media: `(min-width: ${width}px)`,
          srcset: ' 1x,  2x',
        })
      })
    })
  })

  describe('$img function should be called correctly', () => {
    test('given $img function', () => {
      imgMock.mockClear()

      const storyblokProvider = useStoryblokProvider({ $img: imgMock })
      const image = storyblokProvider.buildImage({
        image: responsiveImage.image,
        aspectRatio: '1:1',
        blackAndWhite: true,
      })

      expect(image.webpSources.value.length).toBe(3)
      expect(imgMock).toBeCalledTimes(6)

      imgMock.mockClear()

      expect(image.pngSources.value.length).toBe(3)
      expect(imgMock).toBeCalledTimes(6)
    })
  })
})
