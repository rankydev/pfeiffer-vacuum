const IMAGE_SERVICE = '//img2.storyblok.com/'

const endsWith = (pattern) => (string) =>
  new RegExp(`${pattern}$`, 'i').test(string)

const isImage = (node) => {
  return node && endsWith('(jpg|jpeg|png|gif)')(node.filename)
}

const getImageResolution = (path) => {
  const originalResolution = path.match(/(\d+)x(\d+)/)

  return {
    width: parseInt(originalResolution?.[1] || 0),
    height: parseInt(originalResolution?.[2] || 0),
  }
}

export const render = ({ node, assets = [] } = {}) => {
  const assetMetaInfo = assets.find((asset) => asset.id === node.id) || {}

  if (isImage(node)) {
    if (node.filename && node.filename.startsWith(IMAGE_SERVICE)) {
      return node
    }

    node.originalFilename = node.filename
    node.originalResolution = getImageResolution(node.filename)
  }

  if (assetMetaInfo.content_length) {
    node.contentLength = assetMetaInfo.content_length
  }

  return node
}
