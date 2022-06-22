import { computed } from '@nuxtjs/composition-api'

export function useHybrisProvider() {
  const buildImage = (props) => {
    const src = computed(() => props.image.url || '')
    const alt = computed(() => props.image.altText || '')

    return {
      src,
      alt,
      title: '',
      modifiers: {},
      webpSources: [],
      pngSources: [],
    }
  }

  return {
    buildImage,
  }
}

export default {}
