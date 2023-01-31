import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'

export const useUserApi = () => {
  const { axios } = useAxiosForHybris()

  const DELIVERY_ADDRESSES_BASE = `${config.USER_API}/deliveryaddresses`

  const getUserData = async () => {
    return await axios.$get(config.USER_API, {})
  }

  const updateUserData = async (data) => {
    return await axios.$patch(config.USER_API, data)
  }

  const addCompanyData = async (data) => {
    return await axios.$post(config.ADD_COMPANY, data)
  }

  const register = async (customer, anonymous = true) => {
    const { REGISTER_API, USER_API } = config
    const path = joinURL(anonymous ? REGISTER_API : `${USER_API}/orgCustomers`)
    return axios.$post(path, customer)
  }

  const getUserBillingAddress = async () => {
    return await axios.$get(`${config.USER_API}/billingaddress`, {
      params: { fields: 'FULL' },
    })
  }

  const getUserDeliveryAddresses = async () => {
    return await axios.$get(DELIVERY_ADDRESSES_BASE, {
      params: { fields: 'FULL' },
    })
  }

  const createUserDeliveryAddress = async (address) => {
    return await axios.$post(DELIVERY_ADDRESSES_BASE, address)
  }

  const updateUserDeliveryAddress = async (id, address) => {
    return await axios.$put(`${DELIVERY_ADDRESSES_BASE}/${id}`, address)
  }

  const deleteUserDeliveryAddress = async (id) => {
    return await axios.$delete(`${DELIVERY_ADDRESSES_BASE}/${id}`)
  }

  const setUserDefaultDeliveryAddress = async (id) => {
    return await axios.$post(`${DELIVERY_ADDRESSES_BASE}/${id}/default`)
  }

  return {
    getUserData,
    register,
    updateUserData,
    addCompanyData,
    getUserBillingAddress,
    getUserDeliveryAddresses,
    createUserDeliveryAddress,
    updateUserDeliveryAddress,
    deleteUserDeliveryAddress,
    setUserDefaultDeliveryAddress,
  }
}
