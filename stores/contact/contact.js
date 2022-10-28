import { defineStore } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useUserStore } from '~/stores/user'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'

export const useContactStore = defineStore('contact', () => {
  const { axios } = useAxiosForHybris()
  const userStore = useUserStore()

  const submitContact = async (contact) => {
    return await axios.post(
      joinURL(
        `${config.CONTACT_API}/${
          userStore.isLoggedIn ? 'current' : 'anonymous'
        }`
      ),
      contact
    )
  }

  return {
    submitContact,
  }
})
