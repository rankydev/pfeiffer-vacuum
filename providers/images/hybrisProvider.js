import { joinURL } from 'ufo'

export function getImage(src) {
  return {
    url: joinURL('/api/image', src),
  }
}
