import { getImage } from './hybrisProvider'

jest.mock('@nuxtjs/composition-api', () => {
  return {
    useRouter: () => {
      return { options: { base: 'https://www.diva-e.com/' } }
    },
  }
})

describe('HybrisProvider', () => {
  describe('initial state', () => {
    test('should', () => {
      const hybrisProvider = getImage('image.png')
      expect(hybrisProvider.url).toBe(
        'https://www.diva-e.com/api/images/image.png'
      )
    })
  })
})
