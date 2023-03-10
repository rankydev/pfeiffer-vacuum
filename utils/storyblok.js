const STORYBLOK_ASSET_URL = 'a.storyblok.com'
import { PATH_STORYBLOK_ASSETS } from '~/server/constants.js'
import nuxtConfig from '../nuxt.config'

const replaceStoryblokLinks = (string, replacer) => {
  // hit https://<url>, http://<url> or //<url>
  const re = new RegExp(`(https?:)?\\/\\/${STORYBLOK_ASSET_URL}`, 'g')
  return string.replace(re, replacer)
}

export const getRelativeStoryblokAssetLink = (link) => {
  return replaceStoryblokLinks(link, '')
}

export const getProxyStoryBlokAssetLink = (link) => {
  const CURRENT_REGION_CODE = nuxtConfig.publicRuntimeConfig.CURRENT_REGION_CODE
  return replaceStoryblokLinks(
    link,
    `/${CURRENT_REGION_CODE}${PATH_STORYBLOK_ASSETS}`
  )
}
