import { PATH_EMPOLIS } from '~/server/constants'

export const useEmpolisHelper = () => {
  const isStepFile = (file) => {
    return file.informationType?.value?.includes('Step-File')
  }

  const getDownloadButtonBaseConfig = (file) => {
    return {
      target: '_blank',
      href: `${PATH_EMPOLIS}/${file.downloadLink}`,
      download: isStepFile(file) ? `${file.title}.stp` : null,
    }
  }

  return {
    getDownloadButtonBaseConfig,
  }
}

// export default {
//   computed: {
//     ...mapGetters(['loggedIn']),
//     empolisPortalUrl() {
//       const useEmpolisProductionSystem = this.$env.NODE_PROFILE !== 'develop'

//       const publicPortalUrl = `${this.$env.EMPOLIS_PATH}portal/${this.$env.EMPOLIS_STAGE}/`
//       if (!useEmpolisProductionSystem) {
//         return publicPortalUrl
//       }

//       // Empolis only offers a Guest-Token URL for our production environment
//       if (!this.loggedIn) {
//         return `${this.$env.EMPOLIS_GUEST_TOKEN_URL}?redirect=${publicPortalUrl}`
//       }

//       const keycloakInstance = this.$store?.$keycloakInstance
//       const isInternalLevel =
//         keycloakInstance?.hasRealmRole('internal_level_0') ||
//         keycloakInstance?.hasRealmRole('internal_level_1') ||
//         keycloakInstance?.hasRealmRole('internal_level_2')
//       if (!isInternalLevel) {
//         return `${this.$env.EMPOLIS_GUEST_TOKEN_URL}?redirect=${publicPortalUrl}`
//       }

//       return `${this.$env.EMPOLIS_SSO_PATH}portal/${this.$env.EMPOLIS_STAGE}/`
//     },
//     empolisProxyDownloadPath() {
//       return this.$env.PROXY_PATH_EMPOLIS
//     },
//   },
//   methods: {
//     openEmpolisSearch: function () {
//       window.event.preventDefault()
//       window.open(`${this.empolisPortalUrl}search`, '_blank')
//     },
//     openFileInEmpolis: function (id) {
//       const searchContext = encodeURIComponent(JSON.stringify(this.context))
//       window.open(
//         `${this.empolisPortalUrl}document/${id}?context=${searchContext}`,
//         '_blank'
//       )
//     },
//   },
// }
