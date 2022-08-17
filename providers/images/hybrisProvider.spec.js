import { getImage } from './hybrisProvider'

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should', () => {
      const hybrisProvider = getImage('image.png', {
        baseURL: 'http://www.diva-e.com/',
      })
      const imageURL = 'http://www.diva-e.com/image.png'
      expect(hybrisProvider.url).toBe(imageURL)
    })
  })
})
