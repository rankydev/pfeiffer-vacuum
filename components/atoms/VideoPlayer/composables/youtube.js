import { ref, computed, unref } from '@nuxtjs/composition-api'
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
  const url = ref(null)
  const setUrl = (newUrl) => (url.value = newUrl)

  const id = computed(() => getYouTubeID(unref(url)) || null)
  const hasId = computed(() => unref(id) !== null)
  const image = computed(() => getJpg(unref(id)))

  const sources = computed(() => [
    { srcset: getWebp(unref(id)), type: 'image/webp' },
  ])

  const iframeAttributes = computed(() => ({
    src: getSrc(unref(id)),
    ...DEFAULT_IFRAME_ATTRIBUTES,
  }))

  return {
    setUrl,
    id,
    hasId,
    data: {
      icon: 'youtube',
      image,
      sources,
      iframeAttributes,
    },
  }
}

export default {}
