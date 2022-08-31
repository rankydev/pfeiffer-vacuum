import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

export const useOciStore = defineStore('oci', () => {
  const isOciPage = ref(false)
  const hookUrl = ref('')
  const returnTarget = ref('_self')
  const hiddenUIElements = ref({})
  const customerId = ref('')
  return { isOciPage, hookUrl, returnTarget, hiddenUIElements, customerId }
})
