import {
  computed,
  useContext,
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

export const useUserStore = defineStore('user', () => {
  const { logger } = useLogger('userStore')
  const ctx = useContext()
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

    const user = await userApi.getUserData()
    if (user && !user.error) {
      currentUser.value = user
    } else {
      logger.error('user not found', user)
    }
  }

  const login = async () => {
    logger.debug('login')
    const { i18n } = ctx
    const url = `${window.location.href}?isLoginProcess=true`
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
  }
})
