import { getImage } from './hybrisProvider'
import { hybrisResponsiveImageEntry } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { PATH_SHOP_IMAGES } from '~/server/constants.js'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should', () => {
      const hybrisProvider = getImage(hybrisResponsiveImageEntry.image.url)
      expect(hybrisProvider.url).toContain(PATH_SHOP_IMAGES)
      expect(hybrisProvider.url).toContain(hybrisResponsiveImageEntry.image.url)
    })
  })
})
