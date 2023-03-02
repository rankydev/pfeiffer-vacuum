import { defineStore } from 'pinia'
import { ref, useContext, useRoute } from '@nuxtjs/composition-api'

export const useOciStore = defineStore('oci', () => {
  const route = useRoute()
  const { $config } = useContext()
  const { CURRENT_REGION_CODE } = $config
  const isOciPage = ref(CURRENT_REGION_CODE === 'oci')

  // TODO We maybe also need to store those in cookies or storage
  const hookUrl = ref(route.value.query.HOOK_URL)
  const returnTarget = ref(route.value.query.RETURNTARGET || '_self')
  const customerId = ref(route.value.query.customerId)

  return {
    // state
    isOciPage,
    hookUrl,
    returnTarget,
    customerId,
  }
})
