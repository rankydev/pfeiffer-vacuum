import {
  computed,
  useContext,
  useRoute,
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

  const userBillingAddress = computed(
    () =>
      currentUser.value?.orgUnit?.addresses?.find((e) => e.billingAddress) || {}
  )

  const userCountry = computed(() => userBillingAddress.value?.country || {})

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

  const addCompanyData = async (data) => {
    isLoading.value = true
    let res
    try {
      res = await userApi.addCompanyData(data)
      await loadCurrentUser()
      toast.success(
        { description: 'Your data were updated successfully' },
        { timeout: 5000 }
      )
    } catch (e) {
      logger.error('cannot add company data', e)
      toast.error(
        {
          description: 'An error occured while updating company data',
        },
        { timeout: 5000 }
      )
    } finally {
      isLoading.value = false
    }
    return res
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

    isLoading.value = true

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

    isLoading.value = false
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

    // getters
    isApprovedUser,
    isLeadUser,
    isOpenUser,
    isRejectedUser,
    isLoggedIn,
    isLoading,
    userBillingAddress,
    userCountry,
    changePasswordLink,

    // actions
    loadCurrentUser,
    updateCurrentUser,
    addCompanyData,
    login,
    logout,
    register: userApi.register,
  }
})
