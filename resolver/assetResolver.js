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
    // this one is used as "normal" asset url. But now using our proxy instead of storyblok url
    node.originalFilename = getProxyStoryBlokAssetLink(node.filename)
    // this relative path should be used for nuxt-image. It has its own base url in nuxt.config.js
    node.originalFilenameRelative = getRelativeStoryblokAssetLink(node.filename)
    node.originalResolution = getImageResolution(node.filename)
  }

  if (assetMetaInfo.content_length) {
    node.contentLength = assetMetaInfo.content_length
  }

  return node
}
