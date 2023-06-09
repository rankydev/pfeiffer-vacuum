import { defineStore } from 'pinia'
import {
  ref,
  useContext,
  useRouter,
  useRoute,
  computed,
  ssrRef,
} from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useProductStore } from './product'
import config from '~/config/hybris.config'

export const useVariationmatrixStore = defineStore('variationmatrix', () => {
  const productStore = useProductStore()
  const router = useRouter()
  const route = useRoute()
  const { axios } = useAxiosForHybris()
  const { localePath } = useContext()

  /*
   * Variationmatrix specific constants
   */
  const variationMatrix = ssrRef(null)
  const selectedAttributes = ref({})
  const currentMasterId = ssrRef(null)
  const currentVariantId = ssrRef(null)
  const matrixStillValid = ssrRef(false)
  const loadingMatrix = ssrRef(false)

  /*
   * Retrieve variation matrix object from hybris given a product id and selected attributes
   */
  const loadVariationMatrix = async () => {
    const id = route.value.params.product || ''

    // Return when old matrix is still valid and no new matrix is needed
    if (matrixStillValid.value) {
      matrixStillValid.value = false
      return
    }

    loadingMatrix.value = true

    // Check if variant specific matrix should be loaded
    let shouldLoadVariantMatrix = false
    if (
      !hasOnlyOneVariantLeft(variationMatrix.value) &&
      currentVariantId.value &&
      !currentMasterId.value
    )
      shouldLoadVariantMatrix = true

    let productCode = shouldLoadVariantMatrix
      ? currentVariantId.value
      : currentMasterId.value || id

    if (!variationMatrix.value) productCode = id

    // Write route query data to store on first load
    if (!variationMatrix.value) selectedAttributes.value = route.value.query

    // Get variation matrix from hybris
    let result
    const url = joinURL(config.PRODUCTS_API, productCode, 'variationmatrix')
    try {
      result = await axios.$get(url, {
        params: { ...selectedAttributes.value, fields: 'FULL' },
      })
      // Set selected attributes as user selection for first variant loading
      if (result.allSelected && !Object.keys(selectedAttributes.value).length)
        setHybrisSelectionAsUserInput(result)

      // Check if redirect is needed
      if (
        hasOnlyOneVariantLeft(result) &&
        hasDifferentVariant(variationMatrix.value, result)
      ) {
        // Redirect to variant page when only one variant is left
        redirectToId(result.variantCodes?.[0])
      } else if (
        currentVariantId.value &&
        !hasOnlyOneVariantLeft(result) &&
        !result.allSelected
      ) {
        // Redirect to master page when more than one variant is available after selection update
        redirectToId(
          currentMasterId.value || productStore.product.value.master,
          true
        )
      } else if (variationMatrix.value && !hasOnlyOneVariantLeft(result))
        pushCurrentSelectionInQuery()

      // Write result into store
      variationMatrix.value = result

      // when we are on server side we want to put this as still valid to prevent unneeded intial client side reload
      // but we do not want to do this on client side since we need to refresh matrix f.e. after language switch [PVWEB-1008]
      // when its needed to keep matrix valid manually it needs to be done explicit. Like in "redirectToId"
      if (process.server) {
        matrixStillValid.value = true
      }
    } catch (error) {
      console.error(error)
    } finally {
      loadingMatrix.value = false
    }
  }

  /*
   * Is called when an attributed was clicked
   * Decide whether attribute should be added or removed from user selection
   */
  const toggleAttribute = async (key, val) => {
    if (loadingMatrix.value) return

    key in selectedAttributes.value && selectedAttributes.value[key] === val
      ? await deleteAttribute(key)
      : await addAttribute(key, val)
  }

  /*
   * Adds an attribute to user selection
   */
  const addAttribute = async (key, val) => {
    selectedAttributes.value[key] = val
    matrixStillValid.value = false
    await loadVariationMatrix()
  }

  /*
   * Removes an attribute from user selection
   */
  const deleteAttribute = async (key) => {
    delete selectedAttributes.value[key]
    matrixStillValid.value = false
    await loadVariationMatrix()
  }

  /*
   * Clear necessary matrix parameters from store when product is switched
   * ( only when old matrix is not valid anymore )
   */
  const clearMatrix = () => {
    // Do not clear when matrix should be still valid
    if (matrixStillValid.value) return

    matrixStillValid.value = false
    currentMasterId.value = null
    currentVariantId.value = null
    variationMatrix.value = null
    selectedAttributes.value = {}
  }

  /*
   * Clear only the selected attributes to start the selection from scratch
   */
  const clearSelection = async () => {
    selectedAttributes.value = {}
    matrixStillValid.value = false
    await loadVariationMatrix()
  }

  /*
   * Sets automatically selected attributes by hybris as user input when no user
   * selected attributes are given in selectedAttributes object
   */
  const setHybrisSelectionAsUserInput = (matrix) => {
    matrix.variationAttributes?.forEach((el) => {
      const selectedValue = el.variationValues.find((e) => e?.selected)
      selectedAttributes.value[el.code] = selectedValue?.value
    })
  }

  /*
   * Matrix object can be given to determine whether there is only one variant left or more
   */
  const hasOnlyOneVariantLeft = (matrix) => matrix?.variantCodes?.length === 1

  /**
   * Returns index of first attribute where no value is selected
   */
  const firstNotSelectedIndex = computed(() =>
    variationMatrix.value?.variationAttributes?.findIndex(
      (item) =>
        !item.variationValues.some(
          (el) => el.selected || el.automaticallySelected
        )
    )
  )

  /**
   * provides information about whether there is an open choice in the matrix for the user
   * This will also be true if there are automaticallySelected values involved
   */
  const isSelectionCompleted = computed(() => {
    return variationMatrix.value?.allSelected
  })

  /**
   * Those options are left even if user selected all values
   * This is an edge case and can happen if multiple variants are left after selection
   * If it happens manual selection by the user is required
   */
  const manualVariantSelectionOptions = computed(() => {
    if (
      isSelectionCompleted.value &&
      variationMatrix.value?.variantCodes?.length > 1
    ) {
      return variationMatrix.value.variantCodes
    }
    return []
  })

  /*
   * Old and new matrix object can be given to determine whether there are two different variants left for redirection
   */
  const hasDifferentVariant = (oldMatrix, newMatrix) =>
    oldMatrix &&
    (oldMatrix?.variantCodes?.length > 1 ||
      oldMatrix?.variantCodes?.[0] !== newMatrix?.variantCodes?.[0])

  /*
   * When product state in frontend application should switch from master to variant and vice versa the application
   * has to redirect the user to get the correct URL and breadcrumb
   */
  const redirectToId = (id, withQuery = false) => {
    router.push({
      path: joinURL(localePath('shop-products-product'), id),
      query: withQuery ? selectedAttributes.value : null,
    })
    matrixStillValid.value = true
  }

  const pushCurrentSelectionInQuery = () =>
    router.push({ path: route.path, query: selectedAttributes.value })

  return {
    variationMatrix,
    currentMasterId,
    currentVariantId,
    selectedAttributes,
    loadingMatrix,
    isSelectionCompleted,
    firstNotSelectedIndex,
    manualVariantSelectionOptions,
    loadVariationMatrix,
    addAttribute,
    deleteAttribute,
    toggleAttribute,
    clearMatrix,
    clearSelection,
    redirectToId,
  }
})
