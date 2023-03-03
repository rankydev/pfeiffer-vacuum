import {
  computed,
  useContext,
  useRoute,
  useRouter,
  onBeforeMount,
  onServerPrefetch,
  ssrRef,
  ref,
} from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'
import { useKeycloak } from './partials/useKeycloak'
import { useUserApi } from './partials/useUserApi'
import { watch } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useOciStore } from '~/stores/oci'
import { joinURL } from 'ufo'
import { useToast } from '~/composables/useToast'

export const useUserStore = defineStore('user', () => {
  const { logger } = useLogger('userStore')
  const toast = useToast()
  const ctx = useContext()
  const router = useRouter()
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
  const isLoading = ref(false)

  const currentUser = ssrRef(null)
  const billingAddress = ssrRef(null)
  const deliveryAddresses = ssrRef(null)

  const customerId = computed(() => currentUser.value?.orgUnit?.customerId)

  const isOpenUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'OPEN'
  })
  const isLeadUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'LEAD'
  })
  const isOciUser = computed(() => {
    return ociStore.checkForOciUser(auth)
  })
  const isRejectedUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'REJECTED'
  })
  const isApprovedUser = computed(() => {
    return currentUser.value?.registrationStatus?.code === 'APPROVED'
  })

  const userBillingAddress = computed(
    () =>
      currentUser.value?.orgUnit?.addresses?.find((e) => e.billingAddress) || {}
  )

  const userStatusTypeForInfoText = computed(() => {
    if (isLeadUser.value) return 'lead'
    if (isOpenUser.value) return 'open'
    if (isRejectedUser.value) return 'rejected'
    return 'undefined'
  })

  const accountManagerData = ref(null)

  const loadAccountManagerData = async () => {
    if (!isLoggedIn.value || !isApprovedUser.value) {
      accountManagerData.value = null
    } else {
      accountManagerData.value = await userApi.getAccountManager(
        currentUser.value
      )
    }
  }

  const userCountry = computed(() => userBillingAddress.value?.country || {})
  const userRegion = computed(() => userBillingAddress.value?.region || {})

  const changePasswordLink = computed(() => {
    const keycloakBaseUrl = ctx.$config.KEYCLOAK_BASE_URL + 'realms/'
    const keycloackRealm = ctx.$config.KEYCLOAK_REALM_NAME
    const language = `kc_locale=${ctx.i18n.locale}`
    return `${keycloakBaseUrl}${keycloackRealm}/account/password?${language}`
  })

  watch(auth, async (newAuth) => {
    //load currentUser data if currentUser obj is empty
    if (newAuth && !currentUser.value) {
      await loadCurrentUser()
      await loadAccountManagerData()
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

    isLoading.value = true

    try {
      const user = await userApi.getUserData()
      currentUser.value = user
    } catch (e) {
      logger.error('user not found', e)
    } finally {
      isLoading.value = false
    }
  }

  const updateCurrentUser = async (data) => {
    isLoading.value = true
    try {
      await userApi.updateUserData(data)
      await loadCurrentUser()
      toast.success(
        { description: ctx.i18n.t('registration.updateAccountData.success') },
        { timeout: 5000 }
      )
    } catch (e) {
      logger.error('cannot patch user data', e)
      toast.error(
        {
          description: ctx.i18n.t(
            'registration.updateAccountData.errorOccured'
          ),
        },
        { timeout: 5000 }
      )
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data, isLiteRegistration = true) => {
    const customerData = {
      ...data.value.personalData,
      ...data.value.companyData,
      companyAddressCountryIso: data.value.personalData.address.country.isocode,
      companyAddressRegion: data.value.personalData.address.region?.isocode,
      companyAlreadyCustomer:
        data.value.companyData?.companyAlreadyCustomer || false,
    }

    await userApi
      .register(customerData)
      .then(() => {
        let successPagePath = '/shop/register/success'
        if (isLiteRegistration) {
          successPagePath += '?type=lite'
        }
        router.push(ctx.app.localePath(successPagePath))
      })
      .catch((err) => {
        err?.data?.errors.forEach((error) => {
          switch (error.type) {
            case 'CustomerAlreadyExistsError':
              toast.error({
                description: ctx.i18n.t(
                  'form.message.error.customerAlreadyExists'
                ),
              })
              break
            case 'CustomerInconsistentError':
              toast.error({
                description: ctx.i18n.t(
                  'form.message.error.customerInconsistentError'
                ),
              })
              break
            case 'B2bRegistrationFailedError':
              toast.error({
                description: ctx.i18n.t('form.message.error.technicalError'),
              })
              break
            default:
              toast.error({
                description: ctx.i18n.t('form.message.error.defaultError'),
              })
              break
          }
        })
      })
  }

  const addCompanyData = async (data) => {
    isLoading.value = true
    let res
    try {
      res = await userApi.addCompanyData(data)
      await loadCurrentUser()
      return res
    } catch (e) {
      logger.error('cannot add company data', e)
      return Promise.reject(e)
    } finally {
      isLoading.value = false
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
      const mappedAddresses = {
        addresses: result.addresses
          .map((item) => {
            return {
              ...item,
              defaultShippingAddress: item.defaultShippingAddress || false,
            }
          })
          .sort((a, b) => b.defaultShippingAddress - a.defaultShippingAddress),
      }
      deliveryAddresses.value = mappedAddresses
      return mappedAddresses.addresses
    } catch (e) {
      logger.error(
        `Error when fetching billing address for user. Returning empty object.`,
        e
      )
      return null
    }
  }

  const loadAddressData = async () => {
    await Promise.all([loadBillingAddress(), loadDeliveryAddresses()])
  }

  const createDeliveryAddress = async (address) => {
    await userApi.createUserDeliveryAddress(address)
    loadCurrentUser()
  }

  const updateDeliveryAddress = async (id, address) => {
    await userApi.updateUserDeliveryAddress(id, address)
    loadCurrentUser()
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
      loadCurrentUser()
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
    const { localePath } = app
    const url = joinURL(
      window.location.origin,
      router?.options.base,
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

    isLoading.value = true

    // remove internal data
    removeCookiesAndDeleteAuthData()

    if (keycloakInstance.value) {
      // no redirect needed here, since onAuthLogout from keycloak takes care of this.
      await keycloakInstance.value.logout()
    } else {
      // redirect here, if no keycloak instance is available.
      const { app } = ctx
      const { localePath } = app
      return router?.push(localePath('/'))
    }

    isLoading.value = false
  }

  /* istanbul ignore else  */
  if (!ociStore.isOciPage && !ociStore.checkForOciUser(auth)) {
    createKeycloakInstance()
  }

  // the initial store initialization
  /* istanbul ignore else  */
  if (!currentUser.value) {
    onBeforeMount(async () => {
      await loadCurrentUser()
      await loadAccountManagerData()
    })
    onServerPrefetch(async () => {
      await loadCurrentUser()
      await loadAccountManagerData()
    })
  }

  return {
    // state
    isLoginProcess,
    currentUser,
    auth,
    billingAddress,
    deliveryAddresses,
    accountManagerData,

    // getters
    customerId,
    isApprovedUser,
    isLeadUser,
    isOciUser,
    isOpenUser,
    isRejectedUser,
    isLoggedIn,
    userStatusTypeForInfoText,
    isLoading,
    userBillingAddress,
    userCountry,
    userRegion,
    changePasswordLink,
    keycloakInstance: computed(() => keycloakInstance.value),

    // actions
    loadCurrentUser,
    updateCurrentUser,
    addCompanyData,
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
    register,
  }
})
