import config from '../hybris.config'
import { useAuthStore } from '~/stores/auth'

export function getUserApi(axios4Shop, ctx) {
  const logger = ctx.$getLoggerFor('userApi')
  const { $authApi } = ctx
  const authStore = useAuthStore()

  return {
    async getUserData() {
      return await axios4Shop.$get(config.USER_API, {})
    },

    async verify(token) {
      const result = await axios4Shop.$post(
        `${config.DOUBLE_OPT_IN}/verifyEmail`,
        { token }
      )

      if (!result.error) {
        return { success: true }
      }

      switch (result.errors?.[0]?.type) {
        case 'InvalidTokenError':
        case 'CustomerNotFoundError':
        case 'TokenInconsistentError':
        case 'TokenExpiredError':
          return { error: result.errors?.[0]?.type }
        default:
          logger.error('Error when verifing token.', result.error)
          return { error: 'UnknownError' }
      }
    },

    async resendToken(payload) {
      const result = await axios4Shop.$post(
        `${config.DOUBLE_OPT_IN}/sendVerificationMail`,
        payload
      )

      if (result.error) {
        logger.error('Error when resending verification token.', result.error)
      }

      return result
    },

    async getBillingAddress() {
      const result = await axios4Shop.$get(config.USER_API + '/billingaddress')

      if (typeof result === 'object' && !result.error) {
        return result
      }

      logger.error(
        'Error when fetching billing address. Returning null.',
        result.error ? result.error : ''
      )
      return null
    },

    async getDeliveryAddresses() {
      const result = await axios4Shop.$get(
        config.USER_API + '/deliveryaddresses',
        { params: { fields: 'FULL' } }
      )

      if (
        typeof result === 'object' &&
        !result.error &&
        result.addresses &&
        Array.isArray(result.addresses)
      ) {
        return result.addresses
      }

      logger.error(
        'Error when fetching delivery addresses. Returning empty array.',
        result.error ? result.error : ''
      )
      return []
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

    async updateDeliveryAddress(id, address) {
      const result = await axios4Shop.$put(
        config.USER_API + '/deliveryaddresses/' + id,
        address
      )

      if (
        typeof result === 'object' &&
        !result.error &&
        result.addresses &&
        Array.isArray(result.addresses)
      ) {
        return result.addresses
      }

      logger.error(
        'Error when fetching delivery addresses. Returning empty array.',
        result.error ? result.error : ''
      )
      return []
    },

    async setDefaultDeliveryAddress(id) {
      const result = await axios4Shop.$post(
        config.USER_API + '/deliveryaddresses/' + id + '/default'
      )

      if (typeof result === 'object' && !result.error) {
        return []
      }

      logger.error(
        'Error when setting default delivery address',
        result.error ? result.error : ''
      )
      return []
    },

    async createDeliveryAddress(address) {
      const result = await axios4Shop.$post(
        `${config.USER_API}/deliveryaddresses`,
        address
      )

      if (typeof result === 'object' && !result.error) {
        return result
      }

      logger.error(
        'Error when creating delivery addresses. Returning null.',
        result.error ? result.error : ''
      )
      return null
    },

    async deleteDeliveryAddress(id) {
      const result = await axios4Shop.$delete(
        `${config.USER_API}/deliveryaddresses/${id}`
      )

      if (typeof result === 'object' && !result.error) {
        return result
      }

      logger.error(
        'Error when deleting delivery address. Returning null.',
        result.error ? result.error : ''
      )
      return null
    },

    requestPasswordForgottenToken(username) {
      return axios4Shop.$post(
        config.PASSWORD_FORGOTTEN_TOKEN + '?userId=' + username,
        null
      )
    },

    resetPassword(newPassword, token) {
      return axios4Shop.$post(config.PASSWORD_RESET, {
        newPassword,
        token,
      })
    },

    async changePassword(
      currentPassword,
      newPassword,
      newPasswordConfirmation
    ) {
      return $authApi.changePassword(
        currentPassword,
        newPassword,
        newPasswordConfirmation
      )
    },

    async getAccountManager() {
      if (!authStore.loggedIn || !authStore.isApprovedUser) {
        return {}
      }

      const result = await axios4Shop.$get(
        `${config.USER_API}/orgUnits/${authStore.currentUser.orgUnit.uid}/salesengineer`
      )

      if (typeof result === 'object' && !result.error) {
        return result
      }

      logger.error(
        'Error when fetching account managers. Returning empty array.',
        result.error ? result.error : ''
      )
      return {}
    },

    async register(customer, anonymous = true) {
      const { REGISTER_API, USER_API } = config
      const path = anonymous ? REGISTER_API : `${USER_API}/orgCustomers`
      return axios4Shop.$post(path, customer)
    },
  }
}
