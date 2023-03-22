import { PATH_EMPOLIS } from '~/server/constants'
import {
  computed,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { joinURL } from 'ufo'

export const useEmpolisHelper = () => {
  const userStore = useUserStore()
  const { keycloakInstance, isLoggedIn } = storeToRefs(userStore)
  const ctx = useContext()
  const { $config } = ctx
  const route = useRoute()
  const router = useRouter()

  const isStepFile = (file) => {
    return file.informationType?.value?.includes('Step-File')
  }

  const getDownloadButtonBaseConfig = (file) => {
    return {
      target: '_blank',
      href: joinURL(router.options.base, PATH_EMPOLIS, file.downloadLink),
      download: isStepFile(file) ? `${file.title}.stp` : null,
    }
  }

  const empolisPortalUrl = computed(() => {
    const useEmpolisProductionSystem = $config.EMPOLIS_STAGE === 'project1_p'

    const publicPortalUrl = `${$config.EMPOLIS_PATH}portal/${$config.EMPOLIS_STAGE}/`
    if (!useEmpolisProductionSystem) {
      return publicPortalUrl
    }

    const guestTokenRedirectUrl = `${$config.EMPOLIS_GUEST_TOKEN_URL}?redirect=${publicPortalUrl}`

    // Empolis only offers a Guest-Token URL for our production environment
    if (!isLoggedIn.value) {
      return guestTokenRedirectUrl
    }

    const isInternalLevel =
      keycloakInstance.value?.hasRealmRole('internal_level_0') ||
      keycloakInstance.value?.hasRealmRole('internal_level_1') ||
      keycloakInstance.value?.hasRealmRole('internal_level_2')

    if (!isInternalLevel) {
      return guestTokenRedirectUrl
    }

    return `${$config.EMPOLIS_SSO_PATH}portal/${$config.EMPOLIS_STAGE}/`
  })

  const empolisSearchUrl = computed(() => {
    return `${empolisPortalUrl.value}search`
  })

  const getFileInEmpolisUrl = (id) => {
    const empolisContext = {
      filter: route.value.query?.filter
        ? JSON.parse(route.value.query?.filter.toString())
        : {},
      text: route.value.query?.searchTerm ? route.value.query?.searchTerm : '',
      page: 1,
      useExportQuery: 0,
    }

    const searchContext = encodeURIComponent(JSON.stringify(empolisContext))

    return `${empolisPortalUrl.value}document/${id}?context=${searchContext}`
  }

  return {
    empolisSearchUrl,
    getDownloadButtonBaseConfig,
    getFileInEmpolisUrl,
  }
}
