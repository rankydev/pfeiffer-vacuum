import { useHybrisProvider } from './hybrisProvider.js'
import { hybrisResponsiveImageEntries } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { expect } from '@jest/globals'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should have matching src and altText values given hybrisResponsiveImageEntries', () => {
      const hybrisProvider = useHybrisProvider()
      const props = hybrisProvider.buildImage(hybrisResponsiveImageEntries)
      expect(props.src.value).toBe(hybrisResponsiveImageEntries.image.url)
      expect(props.alt.value).toBe(hybrisResponsiveImageEntries.image.altText)
    })
    test('should render src and alt with empty String, when no image provided', () => {
      const hybrisProvider = useHybrisProvider()
      const props = hybrisProvider.buildImage({ image: {} })
      expect(props.src.value).toBe('')
      expect(props.alt.value).toBe('')
    })
  })
})
