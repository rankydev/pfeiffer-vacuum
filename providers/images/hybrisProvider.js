import { joinURL } from 'ufo'
import { PATH_SHOP_IMAGES } from '~/server/constants.js'

export function getImage(src) {
  return {
    url: joinURL(PATH_SHOP_IMAGES, src),
  }
}
