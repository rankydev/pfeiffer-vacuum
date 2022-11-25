import { joinURL } from 'ufo'
import { PATH_SHOP_IMAGES } from '~/server/constants.js'
import { useContext } from '@nuxtjs/composition-api'

export const useImageHelper = () => {
  /**
   * Return image url for an image from assets
   * (needed for dynamic image assets)
   *
   * @param image path to the imgage in asset images folder
   * @returns string with image asset url
   */
  const getAssetImage = (image) => {
    return require('~/assets/images/' + image)
  }

  /**
   * Return image url for an image from hybris media
   *
   * @param image path to the image in hybris medias extension
   * @returns string with media url
   */
  const getShopMedia = (image) => {
    return joinURL(PATH_SHOP_IMAGES, image)
  }

  const imageUrl = (images) => {
    const { i18n } = useContext()
    if (images) {
      const isPrimaryImage = (img) => img.imageType === 'PRIMARY'
      const isProductImage = (img) => img.format === 'product'
      const findImage = (img) => isPrimaryImage(img) && isProductImage(img)

      const image = images.find(findImage) || {}

      if (image?.url) {
        return { ...image, url: image.url }
      }
    }

    return { url: getAssetImage(i18n.t('product.placeholderImage')) }
  }

  return { getAssetImage, getShopMedia, imageUrl }
}
