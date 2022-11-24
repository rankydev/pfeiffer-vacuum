/**
 * Retrieves and sortes a set of product features for display
 *
 * @param product the product
 * @param code the feature code (e.g. TechnicalData, Dimension, ...)
 * @return {Array}
 */
export default (product, code) => {
  if (!product || !product.typedFeatureList) {
    return []
  }

  const data = product.typedFeatureList.filter((o) => o.code === code)

  if (data && data.length > 0) {
    const features = [...data[0].features]
    return features.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    })
  } else {
    return []
  }
}
