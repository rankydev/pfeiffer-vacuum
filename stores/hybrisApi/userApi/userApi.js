import config from '../hybris.config'

export function getUserApi(axios4Shop) {
  return {
    async getUserData() {
      return await axios4Shop.$get(config.USER_API, {})
    },

    async register(customer, anonymous = true) {
      const { REGISTER_API, USER_API } = config
      const path = anonymous ? REGISTER_API : `${USER_API}/orgCustomers`
      return axios4Shop.$post(path, customer)
    },
  }
}
