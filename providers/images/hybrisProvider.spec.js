import { getImage } from './hybrisProvider'
import { hybrisResponsiveImageEntries } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { expect } from '@jest/globals'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should', () => {
      const hybrisProvider = getImage(hybrisResponsiveImageEntries.image.url)
      expect(hybrisProvider.url).toContain('/api/image/')
      expect(hybrisProvider.url).toContain(
        hybrisResponsiveImageEntries.image.url
      )
    })
  })
})
