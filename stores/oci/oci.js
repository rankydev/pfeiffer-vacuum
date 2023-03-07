import { defineStore } from 'pinia'
import { ref, useContext } from '@nuxtjs/composition-api'
import { useCookieHelper } from '~/composables/useCookieHelper'

export const useOciStore = defineStore('oci', () => {
  const { getCookie, setCookie } = useCookieHelper()
  const { $config } = useContext()
  const { CURRENT_REGION_CODE } = $config
  const isOciPage = ref(CURRENT_REGION_CODE === 'oci')

  const hookUrl = ref(getCookie('oci.HOOK_URL'))
  const returnTarget = ref(getCookie('oci.RETURNTARGET') || '_self')
  const customerId = ref(getCookie('oci.customerId'))

  const saveOciParams = (
    HOOK_URL,
    RETURNTARGET,
    customerIdentifier,
    validUntil
  ) => {
    setCookie('oci.HOOK_URL', HOOK_URL, new Date(validUntil))
    hookUrl.value = HOOK_URL
    setCookie('oci.RETURNTARGET', RETURNTARGET, new Date(validUntil))
    returnTarget.value = RETURNTARGET
    setCookie('oci.customerId', customerIdentifier, new Date(validUntil))
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
