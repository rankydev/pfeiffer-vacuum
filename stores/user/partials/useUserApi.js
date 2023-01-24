import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'

export const useUserApi = () => {
  const { axios } = useAxiosForHybris()
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

  return { getUserData, updateUserData, addCompanyData, register }
}
