import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { defineStore } from 'pinia'
import getLoggerFor from '~/utils/getLoggerFor'
import { useHybrisApiStore } from '~/stores/hybrisApi'
import { useKeycloak } from './partials/useKeycloak'
import { watch } from '@nuxtjs/composition-api'

export const useUserStore = defineStore('user', () => {
  const logger = getLoggerFor('userStore')
  const ctx = useContext()

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
    return currentUser?.registrationStatus?.code === 'OPEN'
  })
  const isLeadUser = computed(() => {
    return currentUser?.registrationStatus?.code === 'LEAD'
  })
  const isRejectedUser = computed(() => {
    return currentUser?.registrationStatus?.code === 'REJECTED'
  })
  const isApprovedUser = computed(() => {
    return currentUser?.registrationStatus?.code === 'APPROVED'
  })

  watch(auth, (newAuth) => {
    //load currentUser data if currentUser obj is empty
    console.log('### watch auth', newAuth)
    if (newAuth && !currentUser.value) {
      loadCurrentUser()
    }

    if (!newAuth) {
      currentUser.value = null
    }
  })

  const loadCurrentUser = async () => {
    console.log('### loadCurrentUser')
    if (!loggedIn.value) {
      return
    }
    const hybrisApiStore = useHybrisApiStore(ctx)
    const user = await hybrisApiStore.userApi.getUserData()
    if (user && !user.error) {
      currentUser.value = user
    } else {
      logger.error('user not found', user || '')
    }
  }

  const login = async () => {
    logger.debug('login')
    const url = window.location.href
    // TODO do we need the locale?
    const options = { locale: 'store.currentLanguage', redirectUri: url }
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
      const { localePath, router } = app
      return router.push(localePath({ name: 'shop' }))
    }
  }

  createKeycloakInstance()

  // during SSR the first thing initialized is the store, reading the cookies for login and cart
  // then we need to distinguish between login process and normal refresh/reload
  if (isLoginProcess.value) {
    // TODO this can't come from the store, so we need the parameter in the url to know we're in login process
    logger.debug('During login process')
    logger.trace('loadCurrentUser')
    loadCurrentUser()
  } else {
    // otherwise, we just preload everything what is there
    logger.debug('Preloading user and cart.')
    loadCurrentUser()
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
    loggedIn,

    // actions
    loadCurrentUser,
    login,
    logout,
  }
})
