import { defineStore } from 'pinia'
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { useCookieHelper } from '~/composables/useCookieHelper'

export const useOciStore = defineStore('oci', () => {
  const { getCookie, setCookie } = useCookieHelper()
  const { $config } = useContext()
  const { CURRENT_REGION_CODE } = $config
  const isOciPage = ref(CURRENT_REGION_CODE === 'oci')

  const hookUrl = ref(getCookie('oci.HOOK_URL'))
  const returnTarget = ref(getCookie('oci.RETURNTARGET') || '_self')
  const customerId = ref(getCookie('oci.customerId'))

  const savelyEncodedHookUrl = computed(() => {
    // NOTE: this logic is migratet 1:1 from PVAC
    let targetUrl = hookUrl.value
    let saveHookUrl = ''

    // If the hook url provided by SAP does contain another url a query parameter
    // we need to seperate this query parameter and encode it seperately, otherwise
    // SAP will not redirect the data correctly
    // e.g http://sap.test/data?TARGET_URL=https%3a%2f%2fesbportal.sap.mpg.de%3a443%2firj%2fportal%2fclassic
    if (targetUrl.indexOf('TARGET_URL') > 0) {
      targetUrl = hookUrl.value.substring(
        hookUrl.value.indexOf('TARGET_URL=') + 11
      )
      saveHookUrl = hookUrl.value.substring(0, hookUrl.value.indexOf('?'))
      saveHookUrl = saveHookUrl + '?TARGET_URL=' + encodeURIComponent(targetUrl)
    } else {
      saveHookUrl = hookUrl.value
    }

    return saveHookUrl
  })

  const saveOciParams = (
    HOOK_URL,
    RETURNTARGET,
    customerIdentifier,
    validUntil
  ) => {
    // uni Lund does not send customerId it will send buyercookie
    const buyercookie = getParameterByName('buyercookie', HOOK_URL)
    const customerIdToSave = buyercookie || customerIdentifier

    setCookie('oci.HOOK_URL', HOOK_URL, new Date(validUntil))
    hookUrl.value = HOOK_URL
    setCookie('oci.RETURNTARGET', RETURNTARGET, new Date(validUntil))
    returnTarget.value = RETURNTARGET
    setCookie('oci.customerId', customerIdToSave, new Date(validUntil))
    customerId.value = customerIdToSave
  }

  // extracts parameter (name) from url string
  const getParameterByName = (name, url) => {
    name = name.replace(/[[\]]/g, '\\$&')
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)

    if (!results) {
      return null
    }
    if (!results[2]) {
      return ''
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  return {
    // state
    isOciPage,
    hookUrl,
    savelyEncodedHookUrl,
    returnTarget,
    customerId,

    // actions
    saveOciParams,
  }
})
