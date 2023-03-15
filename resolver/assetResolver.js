import {
  getRelativeStoryblokAssetLink,
  getProxyStoryBlokAssetLink,
} from '~/utils/storyblok'

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

export const render = ({ node, assets = [] }) => {
  const assetMetaInfo = assets.find((asset) => asset.id === node.id) || {}

  if (isImage(node)) {
    const IMAGE_SERVICE = '//img2.storyblok.com/'

    if (
      node.filename &&
      node.filename.startsWith(IMAGE_SERVICE) &&
      node.originalFilename
    ) {
      // Assuming originalFilename exisits already exists in this case
      // replace it with our proxy and add relative path prop
      // please note: This is untested. I could not find any usage of this. PVWEB-955
      const originalFilename = node.originalFilename
      node.originalFilename = getProxyStoryBlokAssetLink(originalFilename)
      node.originalFilename = getRelativeStoryblokAssetLink(originalFilename)
    } else {
      // there is just a normal filename, so create our own originalFilename and relative path prop
      // this one is used as "normal" asset url. But now using our proxy instead of storyblok url
      node.originalFilename = getProxyStoryBlokAssetLink(node.filename)
      // this relative path should be used for nuxt-image. It has its own base url in nuxt.config.js
      node.originalFilenameRelative = getRelativeStoryblokAssetLink(
        node.filename
      )
      node.originalResolution = getImageResolution(node.filename)
    }
  }

  if (assetMetaInfo.content_length) {
    node.contentLength = assetMetaInfo.content_length
  }

  return node
}
