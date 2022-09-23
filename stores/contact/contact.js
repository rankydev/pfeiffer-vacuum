import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useUserStore } from '~/stores/user'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'

export const useContactStore = defineStore('contact', () => {
  const { logger } = useLogger('contactStore')
  const { axios } = useAxiosForHybris()
  const userStore = useUserStore()

  const submitContact = async (contact) => {
    const result = await axios.post(
      joinURL(
        `${config.CONTACT_API}/${userStore.loggedIn ? 'current' : 'anonymous'}`
      ),
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
