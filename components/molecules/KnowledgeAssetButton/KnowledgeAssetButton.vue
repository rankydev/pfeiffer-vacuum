<template>
  <div>
    <!-- register for webinar button -->
    <Button
      v-if="isFutureEvent && isWebinar"
      :label="isDetailPage ? $t('knowledge.webinar.button.join') : ''"
      variant="primary"
      icon="person_add"
      @click="() => (isLoggedIn ? registerWebinar() : showLoginModal())"
    />

    <!-- watch webinar button -->
    <template v-else-if="isWebinar">
      <Button
        :label="isDetailPage ? $t('knowledge.webinar.button.watch') : ''"
        :disabled="!hasAsset"
        variant="primary"
        icon="play_circle_outline"
        @click="() => (isLoggedIn ? openAsset() : showLoginModal())"
      />
      <div v-if="!hasAsset && isDetailPage" class="tw-mt-4">
        {{ $t('knowledge.webinar.waitForVod') }}
      </div>
    </template>

    <!-- download whitepaper button -->
    <Button
      v-else-if="isWhitepaper && !hasAsset"
      :label="isDetailPage ? $t('knowledge.webinar.button.download') : ''"
      variant="primary"
      icon="get_app"
      @click="() => (isLoggedIn ? openAsset() : showLoginModal())"
    />
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  useContext,
  ref,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useKnowledgeStore } from '~/stores/knowledge'
import { useToast } from '~/composables/useToast'
import Button from '~/components/atoms/Button/Button'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'KnowledgeAssetButton',
  components: {
    Button,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => ['WHITEPAPER', 'WEBINAR'].includes(val),
    },
    webinarRegistrationId: {
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
  emits: ['openModal'],
  setup(props, { emit }) {
    const { i18n } = useContext()
    const toast = useToast()

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const { login } = userStore

    const knowledgeStore = useKnowledgeStore()
    const { registerForWebinar } = knowledgeStore

    const buttonLabel = ref(
      props.isDetailPage ? i18n.t('knowledge.webinar.button.join') : ''
    )
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
      // ToDo: open LoginModal PVWEB-933
      emit('openModal')
    }

    const registerWebinar = async () => {
      try {
        await registerForWebinar(props.webinarRegistrationId)
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
      buttonLabel,
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
.knowledge-btn-icon {
  background-color: #f2e600;
  @apply tw-rounded-md;
  @apply tw-p-4;
}
</style>
