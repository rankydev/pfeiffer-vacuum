import { joinURL } from 'ufo'
import { PATH_SHOP_IMAGES } from '~/server/constants.js'
import { useRouter } from '@nuxtjs/composition-api'

export function getImage(src) {
  const router = useRouter()

  return {
    url: joinURL(router.options.base, PATH_SHOP_IMAGES, src),
  }
}
