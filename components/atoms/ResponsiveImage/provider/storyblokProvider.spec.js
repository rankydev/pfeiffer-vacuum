import { useStoryblokProvider } from './storyblokProvider.js'

describe('StoryblokProvider', () => {
  describe('initial state', () => {
    test('should render src and alt with empty String, when no image provided', () => {
      const storyblokProvider = useStoryblokProvider({})
      const image = storyblokProvider.buildImage({ image: {} })
      expect(image.src.value).toBe('')
      expect(image.alt.value).toBe('')
      expect(image.title.value).toBe('')
    })
  })
})
