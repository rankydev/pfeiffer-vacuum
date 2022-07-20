import { useYoutube } from './youtube.js'

const someId = 'some id'
jest.mock(
  'get-youtube-id',
  () => (url) => url === 'validYoutubeUrl' ? someId : null
)

const youtube = useYoutube()

describe('youtube', () => {
  describe('initial state', () => {
    describe('given an invalid url', () => {
      it('should return false when checkUrl was called', () => {
        const result = youtube.checkUrl('invalidYoutubeUrl')

        expect(result).toBeFalsy()
      })

      it('should return an empty object when no id was found', () => {
        const result = youtube.getData()

        expect(result).toEqual({})
      })
    })

    describe('given an valid url', () => {
      it('should return true when checkUrl was called', () => {
        const result = youtube.checkUrl('validYoutubeUrl')

        expect(result).toBeTruthy()
      })

      it('should return an config object when id was found', () => {
        const result = youtube.getData()

        expect(result).toEqual({
          icon: 'youtube',
          image: expect.stringContaining(someId),
          sources: [
            {
              srcset: expect.stringContaining(someId),
              type: 'image/webp',
            },
          ],
          iframeAttributes: {
            src: expect.stringContaining(someId),
            allowfullscreen: true,
            frameborder: 0,
            allow: expect.any(String),
          },
        })
      })
    })
  })

  // describe('during interaction', () => {})

  // describe('business requirements', () => {})
})
