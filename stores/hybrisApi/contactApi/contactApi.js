import { computed } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import config from '../hybris.config'

export function getContactApi(axiosInstance, ctx) {
  const logger = ctx.$getLoggerFor('contactApi')
  const userStore = useUserStore()
  const loggedIn = computed(() => userStore.loggedIn)

  return {
    async submitContact(contact) {
      const result = await axiosInstance.post(
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
    },
  }
}
