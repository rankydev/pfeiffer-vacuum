import {
  computed,
  ref,
  useContext,
  onBeforeMount,
  onServerPrefetch,
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
    loggedIn,
    createKeycloakInstance,
    removeCookiesAndDeleteAuthData,
  } = useKeycloak()

  const currentUser = ref(null)

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
    if (!loggedIn.value) {
      return
    }

    const user = await userApi.getUserData()
    if (user && !user.error) {
      currentUser.value = user
    } else {
      logger.error('user not found', user || '')
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
      const { router, i18n } = app
      return router.push(`/${i18n.locale}`)
    }
  }

  if (!ociStore.isOciPage && !ociStore.isOciUser(auth)) {
    createKeycloakInstance()
  }

  onBeforeMount(loadCurrentUser)
  onServerPrefetch(loadCurrentUser)

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
    loggedIn,

    // actions
    loadCurrentUser,
    login,
    logout,
  }
})
