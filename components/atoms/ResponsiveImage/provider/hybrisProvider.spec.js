import { useHybrisProvider } from './hybrisProvider.js'
import { hybrisResponsiveImageEntry } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should have matching src and altText values given hybrisResponsiveImageEntry', () => {
      const hybrisProvider = useHybrisProvider()
      const image = hybrisProvider.buildImage(hybrisResponsiveImageEntry)
      expect(image.src.value).toBe(hybrisResponsiveImageEntry.image.url)
      expect(image.alt.value).toBe(hybrisResponsiveImageEntry.image.altText)
    })

    test('should render src and alt with empty String, when no image provided', () => {
      const hybrisProvider = useHybrisProvider()
      const image = hybrisProvider.buildImage({ image: {} })
      expect(image.src.value).toBe('')
      expect(image.alt.value).toBe('')
    })

    test('Should return unused keys as empty elements in the expected data type', () => {
      const hybrisProvider = useHybrisProvider()
      const image = hybrisProvider.buildImage({ image: {} })
      expect(image.modifiers).toStrictEqual({})
      expect(image.webpSources).toStrictEqual([])
      expect(image.pngSources).toStrictEqual([])
    })
  })
})
