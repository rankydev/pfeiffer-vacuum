import { defineStore } from 'pinia'
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { useCookieHelper } from '~/composables/useCookieHelper'
import {
  OCI_HOOK_URL,
  OCI_RETURN_TARGET,
  OCI_CUSTOMER_ID,
} from '~/server/constants.js'

export const useOciStore = defineStore('oci', () => {
  const { getCookie, setCookie } = useCookieHelper()
  const { $config } = useContext()
  const { CURRENT_REGION_CODE } = $config
  const isOciPage = ref(CURRENT_REGION_CODE === 'oci')

  const hookUrl = ref(getCookie(`oci.${OCI_HOOK_URL}`))
  const returnTarget = ref(getCookie(`oci.${OCI_RETURN_TARGET}`, '_self'))
  const customerId = ref(getCookie(`oci.${OCI_CUSTOMER_ID}`))

  const savelyEncodedHookUrl = computed(() => {
    let targetUrl = hookUrl.value
    if (!targetUrl) return ''
    let saveHookUrl = ''

    // NOTE: this logic is migratet 1:1 from PVAC
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
    setCookie(`oci.${OCI_HOOK_URL}`, HOOK_URL, new Date(validUntil))
    hookUrl.value = HOOK_URL
    setCookie(`oci.${OCI_RETURN_TARGET}`, RETURNTARGET, new Date(validUntil))
    returnTarget.value = RETURNTARGET || '_self'
    setCookie(
      `oci.${OCI_CUSTOMER_ID}`,
      customerIdentifier,
      new Date(validUntil)
    )
    customerId.value = customerIdentifier
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
