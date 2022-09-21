import config from '../hybris.config'
import { useAuthStore } from '~/stores/auth'

export function getUserApi(axios4Shop, ctx) {
  const authStore = useAuthStore(ctx)

  return {
    async getUserData() {
      return await axios4Shop.$get(config.USER_API, {})
    },

    async updateCurrentUserData(userData) {
      const changeData = await axios4Shop.$patch(config.USER_API, userData)
      if (!changeData.error) {
        const user = await axios4Shop.$get(config.USER_API, {})
        if (typeof user === 'object' && !user.error) {
          authStore.currentUser = user
        }
      }
      return changeData
    },

    async register(customer, anonymous = true) {
      const { REGISTER_API, USER_API } = config
      const path = anonymous ? REGISTER_API : `${USER_API}/orgCustomers`
      return axios4Shop.$post(path, customer)
    },
  }
}
