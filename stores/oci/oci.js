import { defineStore } from 'pinia'
import { ref, useContext } from '@nuxtjs/composition-api'

export const useOciStore = defineStore('oci', () => {
  const { $config } = useContext()
  const { CURRENT_REGION_CODE } = $config
  const isOciPage = ref(CURRENT_REGION_CODE === 'oci')
  const hookUrl = ref('')
  const returnTarget = ref('_self')
  const hiddenUIElements = ref({})
  const customerId = ref('')

  const checkForOciUser = (auth) => {
    return auth.type === 'oci'
  }

  return {
    // state
    isOciPage,
    hookUrl,
    returnTarget,
    hiddenUIElements,
    customerId,

    // getters
    checkForOciUser,
  }
})
