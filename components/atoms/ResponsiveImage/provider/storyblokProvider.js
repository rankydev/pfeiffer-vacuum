import { theme } from '~/tailwind.config.js'
import { computed } from '@nuxtjs/composition-api'

/**
 * Sort array of sizes by breakpoint descending from xl to sm
 * @param sizesArr
 * @return Array sortedSizes
 */
const sortByBreakpoints = (sizesArr) => {
  const order = ['xl', 'lg', 'md', 'sm']
  return sizesArr.sort((a, b) => {
    return (
      order.indexOf(a.media.toLowerCase()) -
      order.indexOf(b.media.toLowerCase())
    )
  })
}

/**
 * Calculate image height by given width and aspect ratio
 * @return {number}
 * @param maxWidth
 * @param aspectRatio
 */
const calculateHeight = (maxWidth, aspectRatio) => {
  const aspectRatioArr = aspectRatio.split(':')
  const aspectRatioA = aspectRatioArr[0]
  const aspectRatioB = aspectRatioArr[1]

  return Math.floor((maxWidth / aspectRatioA) * aspectRatioB)
}

export function useStoryblokProvider({ $img }) {
  const configScreensArr = Object.entries(theme.screens)

  const buildImage = (props) => {
    const src = computed(() => props.image.originalFilename || '')
    const alt = computed(() => props.image.alt || '')
    const title = computed(() => props.image.title || '')

    const modifiers = computed(() => ({
      focal: props.image.focus,
      grayscale: props.blackAndWhite ? '' : false,
    }))

    /**
     * Create an imageResoultion array from the theme breakpoints
     */
    const imageResolutions = computed(() => {
      const createResolution = (memo, val, idx) => {
        if (idx === configScreensArr.length - 1) return memo

        const media = `(min-width: ${val[1]})`
        const width = Math.floor(parseInt(configScreensArr[idx + 1][1], 10))
        const height = calculateHeight(width, props.aspectRatio)

        return [...memo, { key: val[0], media, width, height }]
      }
      return configScreensArr.reduce(createResolution, [])
    })

    const webpSources = computed(() => {
      return imageResolutions.value.map(({ key, media, width, height }) => {
        const mods = { ...modifiers.value, height, width, format: 'webp' }
        const modsRetina = { ...mods, height: height * 2, width: width * 2 }
        const options = { provider: props.provider }

        const img1x = $img(src.value, mods, options)
        const img2x = $img(src.value, modsRetina, options)

        return { key, media, srcset: `${img1x} 1x, ${img2x} 2x` }
      })
    })

    const pngSources = computed(() => {
      return imageResolutions.value.map(({ key, media, width, height }) => {
        const mods = { ...modifiers.value, height, width, format: 'png' }
        const modsRetina = { ...mods, height: height * 2, width: width * 2 }
        const options = { provider: props.provider }

        const img1x = $img(src.value, mods, options)
        const img2x = $img(src.value, modsRetina, options)

        return { key, media, srcset: `${img1x} 1x, ${img2x} 2x` }
      })
    })

    console.log('imageResolutions', imageResolutions.value)
    console.log('webpSources', webpSources.value)

    return {
      src,
      alt,
      title,
      modifiers,
      webpSources,
      pngSources,
    }
  }

  return {
    buildImage,
  }
}
