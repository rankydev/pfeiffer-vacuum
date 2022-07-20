import { unref } from '@nuxtjs/composition-api'
import getYouTubeID from 'get-youtube-id'

const DEFAULT_IFRAME_ATTRIBUTES = {
  allowfullscreen: true,
  frameborder: 0,
  allow: [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
  ].join('; '),
}

const getJpg = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
const getWebp = (id) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`
const getSrc = (id) => `https://www.youtube.com/embed/${id}?autoplay=1`

export const useYoutube = () => {
  let id = null

  const checkUrl = (url) => {
    id = getYouTubeID(unref(url)) || null
    return !!id
  }

  const getData = () => ({
    ...(id !== null && {
      icon: 'youtube',
      image: getJpg(unref(id)),
      sources: [{ srcset: getWebp(unref(id)), type: 'image/webp' }],
      iframeAttributes: {
        src: getSrc(unref(id)),
        ...DEFAULT_IFRAME_ATTRIBUTES,
      },
    }),
  })

  return { checkUrl, getData }
}

export default {}
