import { joinURL } from 'ufo'

export function getImage(src, { baseURL }) {
  return {
    url: joinURL(baseURL, src),
  }
}
