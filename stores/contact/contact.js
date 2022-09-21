import { computed } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useUserStore } from '~/stores/user'
import config from '../hybris.config'

export const useContactStore = defineStore('contact', () => {
  const logger = useLogger('contactStore')
  const { axios } = useAxiosForHybris()
  const userStore = useUserStore()
  const loggedIn = computed(() => userStore.loggedIn)

  const submitContact = async (contact) => {
    const result = await axios.post(
      `${config.CONTACT_API}/${loggedIn ? 'current' : 'anonymous'}`,
      contact
    )

    if (result.status === 200) {
      return true
    }

    logger.error(
      'Error when sending contact form. Returning false.',
      result.error
    )

    return false
  }

  return {
    submitContact,
  }
})
