import { useHybrisProvider } from './hybrisProvider.js'
import { hybrisResponsiveImageEntries } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { expect } from '@jest/globals'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should have matching src and altText values given hybrisResponsiveImageEntries', () => {
      const hybrisProvider = useHybrisProvider()
      const image = hybrisProvider.buildImage(hybrisResponsiveImageEntries)
      expect(image.src.value).toBe(hybrisResponsiveImageEntries.image.url)
      expect(image.alt.value).toBe(hybrisResponsiveImageEntries.image.altText)
    })
    test('should render src and alt with empty String, when no image provided', () => {
      const hybrisProvider = useHybrisProvider()
      const image = hybrisProvider.buildImage({ image: {} })
      expect(image.src.value).toBe('')
      expect(image.alt.value).toBe('')
    })
  })
})
