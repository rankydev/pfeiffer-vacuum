// COPIED FROM PVAC. Needs to be refactored before usage!
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedIn']),
    empolisPortalUrl() {
      const useEmpolisProductionSystem =
        this.$config.EMPOLIS_STAGE === 'project1_p'

      const publicPortalUrl = `${this.$config.EMPOLIS_PATH}portal/${this.$config.EMPOLIS_STAGE}/`
      if (!useEmpolisProductionSystem) {
        return publicPortalUrl
      }

      // Empolis only offers a Guest-Token URL for our production environment
      if (!this.loggedIn) {
        return `${this.$config.EMPOLIS_GUEST_TOKEN_URL}?redirect=${publicPortalUrl}`
      }

      const keycloakInstance = this.$store?.$keycloakInstance
      const isInternalLevel =
        keycloakInstance?.hasRealmRole('internal_level_0') ||
        keycloakInstance?.hasRealmRole('internal_level_1') ||
        keycloakInstance?.hasRealmRole('internal_level_2')
      if (!isInternalLevel) {
        return `${this.$config.EMPOLIS_GUEST_TOKEN_URL}?redirect=${publicPortalUrl}`
      }

      return `${this.$config.EMPOLIS_SSO_PATH}portal/${this.$config.EMPOLIS_STAGE}/`
    },
    empolisProxyDownloadPath() {
      return this.$config.PROXY_PATH_EMPOLIS
    },
  },
  methods: {
    openEmpolisSearch: function () {
      window.event.preventDefault()
      window.open(`${this.empolisPortalUrl}search`, '_blank')
    },
    openFileInEmpolis: function (id) {
      const searchContext = encodeURIComponent(JSON.stringify(this.context))
      window.open(
        `${this.empolisPortalUrl}document/${id}?context=${searchContext}`,
        '_blank'
      )
    },
  },
}
