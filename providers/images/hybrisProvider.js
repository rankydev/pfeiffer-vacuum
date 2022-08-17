import { joinURL } from 'ufo'
import { PATH_SHOP_IMAGES } from '~/server/constants.js'

export function getImage(src, { baseURL }) {
  return {
    url: joinURL(baseURL, src),
  }
}
