import {
  computed,
  useContext,
  useRoute,
  onBeforeMount,
  onServerPrefetch,
  ssrRef,
} from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'
import { useKeycloak } from './partials/useKeycloak'
import { useUserApi } from './partials/useUserApi'
import { watch } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useOciStore } from '~/stores/oci'
import { joinURL } from 'ufo'

export const useUserStore = defineStore('user', () => {
  const { logger } = useLogger('userStore')
  const ctx = useContext()
  const route = useRoute()
  const userApi = useUserApi()
  const ociStore = useOciStore()
  const {
    keycloakInstance,
    auth,
    isLoginProcess,
    isLoggedIn,
    createKeycloakInstance,
    removeCookiesAndDeleteAuthData,
  } = useKeycloak()

  const currentUser = ssrRef(null)
  const billingAddress = ssrRef(null)
  const deliveryAddresses = ssrRef(null)

  const isOpenUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'OPEN'
  })
  const isLeadUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'LEAD'
  })
  const isRejectedUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'REJECTED'
  })
  const isApprovedUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'APPROVED'
  })

  watch(auth, async (newAuth) => {
    //load currentUser data if currentUser obj is empty
    if (newAuth && !currentUser.value) {
      await loadCurrentUser()
    }

    if (!newAuth) {
      currentUser.value = null
    }
  })

  const loadCurrentUser = async () => {
    logger.trace('loadCurrentUser')
    if (!isLoggedIn.value) {
      return
    }

    try {
      const user = await userApi.getUserData()
      currentUser.value = user
    } catch (e) {
      logger.error('user not found', e)
    }
  }

  const loadBillingAddress = async () => {
    try {
      const result = await userApi.getUserBillingAddress()
      billingAddress.value = result
    } catch (e) {
      logger.error(
        `Error when fetching billing address for user. Returning empty object.`,
        e
      )
    }
  }

  const loadDeliveryAddresses = async () => {
    try {
      const result = await userApi.getUserDeliveryAddresses()
      deliveryAddresses.value = {
        addresses: result.addresses
          .map((item) => {
            return {
              ...item,
              defaultShippingAddress: item.defaultShippingAddress || false,
            }
          })
          .sort((a, b) => b.defaultShippingAddress - a.defaultShippingAddress),
      }
    } catch (e) {
      logger.error(
        `Error when fetching billing address for user. Returning empty object.`,
        e
      )
    }
  }

  const loadAddressData = async () => {
    await Promise.all([loadBillingAddress(), loadDeliveryAddresses()])
  }

  const createDeliveryAddress = async (address) => {
    await userApi.createUserDeliveryAddress(address)
  }

  const updateDeliveryAddress = async (id, address) => {
    await userApi.updateUserDeliveryAddress(id, address)
  }

  const deleteDeliveryAddress = async (id) => {
    try {
      await userApi.deleteUserDeliveryAddress(id)
      // refetch delivery addresses
      loadDeliveryAddresses()
    } catch (e) {
      logger.error(`Error when deleting delivery address.`, e)
      throw e
    }
  }

  const setDefaultDeliveryAddress = async (id) => {
    try {
      await userApi.setUserDefaultDeliveryAddress(id)
      // refetch delivery addresses
      loadDeliveryAddresses()
    } catch (e) {
      logger.error(`Error when setting default delivery address.`, e)
      throw e
    }
  }

  const getDeliveryAddressByID = (id) => {
    if (!deliveryAddresses.value?.addresses?.length) return null
    return deliveryAddresses.value.addresses.find(
      (deliveryAddress) => deliveryAddress.id === id
    )
  }

  const login = async () => {
    logger.debug('login')
    const { i18n, app } = ctx
    const { router, localePath } = app
    const url = joinURL(
      window.location.origin,
      router.options.base,
      localePath({
        path: route.value.path,
        query: { ...route.value.query, isLoginProcess: true },
      })
    )
    const options = { locale: i18n.locale, redirectUri: url }
    await keycloakInstance.value.login(options)
  }

  const logout = async () => {
    logger.debug('logout')

    // remove internal data
    removeCookiesAndDeleteAuthData()

    if (keycloakInstance.value) {
      // no redirect needed here, since onAuthLogout from keycloak takes care of this.
      await keycloakInstance.value.logout()
    } else {
      // redirect here, if no keycloak instance is available.
      const { app } = ctx
      const { router, localePath } = app
      return router.push(localePath('/'))
    }
  }

  /* istanbul ignore else  */
  if (!ociStore.isOciPage && !ociStore.isOciUser(auth)) {
    createKeycloakInstance()
  }

  // the initial store initialization
  /* istanbul ignore else  */
  if (!currentUser.value) {
    onBeforeMount(loadCurrentUser)
    onServerPrefetch(loadCurrentUser)
  }

  return {
    // state
    isLoginProcess,
    currentUser,
    auth,
    billingAddress,
    deliveryAddresses,

    // getters
    isApprovedUser,
    isLeadUser,
    isOpenUser,
    isRejectedUser,
    isLoggedIn,

    // actions
    loadCurrentUser,
    login,
    logout,
    loadBillingAddress,
    loadDeliveryAddresses,
    createDeliveryAddress,
    updateDeliveryAddress,
    deleteDeliveryAddress,
    setDefaultDeliveryAddress,
    getDeliveryAddressByID,
    loadAddressData,
    register: userApi.register,
  }
})
