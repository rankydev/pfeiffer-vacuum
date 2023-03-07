import { defineStore } from 'pinia'
import { ref, useContext } from '@nuxtjs/composition-api'
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
    returnTarget,
    customerId,

    // actions
    saveOciParams,
  }
})
