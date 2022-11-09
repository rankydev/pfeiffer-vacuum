import { render } from './assetResolver'

const assets = [
  { id: 'some-other-id', content_length: '300' },
  { id: 'some-id', content_length: '500' },
  { id: 'some-more-id', content_length: '700' },
]

const imageAsset = {
  filename: '/300x300/some-filename.jpeg',
}

const imageAssetWithoutDimensions = {
  filename: '/x/some-filename.jpeg',
}

const resolvedImageAsset = {
  filename: '//img2.storyblok.com/300x300/some-filename.jpeg',
}

const otherAsset = {
  filename: '/some--other-filename.pdf',
}

describe('assetResolver', () => {
  describe('given a non image asset', () => {
    test('should not modify the node object', () => {
      const node = { ...otherAsset }
      const result = render({ node })

      expect(result).toBe(node)
    })
  })

  describe('given a image asset', () => {
    test('should not modify the image asset when image starst with img2.storyblok.com', () => {
      const node = { ...resolvedImageAsset }
      const result = render({ node, assets })

      expect(result).toBe(node)
    })

    test('should add originalFilename when image starts not with img2.storyblok.com', () => {
      const node = { ...imageAsset }
      const result = render({ node, assets })

      expect(result.originalFilename).toBe(node.filename)
    })

    test('should add image resolution when provided in the path', () => {
      const node = { ...imageAsset }
      const result = render({ node, assets })

      expect(result.originalResolution).toStrictEqual({
        height: 300,
        width: 300,
      })
    })

    test('should add a 0x0 image resolution when not provided in the path', () => {
      const node = { ...imageAssetWithoutDimensions }
      const result = render({ node, assets })

      expect(result.originalResolution).toStrictEqual({ height: 0, width: 0 })
    })
  })

  describe('given a matching asset id', () => {
    test('should add contentLength data if provided', () => {
      const node = { ...imageAssetWithoutDimensions, id: 'some-id' }
      const result = render({ node, assets })

      expect(result.contentLength).toBe(assets[1].content_length)
    })
  })
})
