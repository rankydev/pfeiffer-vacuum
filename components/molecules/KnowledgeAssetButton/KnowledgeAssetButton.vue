<template>
  <div>
    <!-- register for webinar button -->
    <button
      v-if="isFutureEvent && isWebinar"
      variant="cta"
      @click="isLoggedIn ? registerWebinar() : showLoginModal()"
    >
      <span v-if="isDetailPage" class="tw-mr-4">
        {{ $t('knowledge.webinar.button.join') }}
      </span>
      <Icon class="tw-mx-4" icon="person_add" />
    </button>

    <!-- watch webinar button -->
    <template v-else-if="isWebinar">
      <button
        variant="cta"
        :disabled="!hasAsset"
        @click="isLoggedIn ? openAsset() : showLoginModal()"
      >
        <span v-if="isDetailPage" class="tw-mr-4">
          {{ $t('knowledge.webinar.button.watch') }}
        </span>
        <Icon icon="play_circle_outline" />
      </button>
      <div v-if="!hasAsset && isDetailPage" class="tw-mt-4">
        {{ $t('knowledge.webinar.waitForVod') }}
      </div>
    </template>

    <!-- download whitepaper button -->
    <button
      v-else-if="isWhitepaper && hasAsset"
      variant="cta"
      @click="isLoggedIn ? openAsset() : showLoginModal()"
    >
      <span v-if="isDetailPage" class="tw-mr-4">
        {{ $t('knowledge.whitepaper.button.download') }}
      </span>
      <Icon icon="get_app" />
    </button>
  </div>
</template>
<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useKnowledgeStore } from '~/stores/knowledge'
import { useToast } from '~/composables/useToast'
import Icon from '~/components/atoms/Icon/Icon'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'KnowledgeAssetButton',
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['WHITEPAPER', 'WEBINAR'].includes(val),
    },
    id: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    assetUrl: {
      type: String,
      default: null,
    },
    isDetailPage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { i18n } = useContext()
    const toast = useToast()

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const { login } = userStore

    const knowledgeStore = useKnowledgeStore()
    const { registerForWebinar } = knowledgeStore

    const isWebinar = computed(() => props.type === 'WEBINAR')
    const isWhitepaper = computed(() => props.type === 'WHITEPAPER')
    const isFutureEvent = computed(() =>
      props.date ? new Date() < new Date(props.date) : false
    )
    const hasAsset = computed(() => (props.assetUrl?.length || 0) > 0)

    const openAsset = () => {
      window.open(props.assetUrl, '_blank').focus()
    }

    const showLoginModal = () => {
      login()
    }

    const registerWebinar = async () => {
      try {
        await registerForWebinar(props.id)
        const message = i18n.t('knowledge.webinar.registration.success')
        toast.success(
          {
            description: message,
          },
          {
            timeout: 8000,
          }
        )
      } catch (e) {
        const message = i18n.t('error.somethingWentWrong')
        toast.warning(
          {
            description: message,
          },
          {
            timeout: 8000,
          }
        )
      }
    }

    return {
      isWebinar,
      isWhitepaper,
      isFutureEvent,
      hasAsset,
      isLoggedIn,
      openAsset,
      showLoginModal,
      registerWebinar,
    }
  },
})
</script>
<style land="scss" scoped>
button {
  background-color: #f2e600;
  @apply tw-rounded-md;
}
</style>
