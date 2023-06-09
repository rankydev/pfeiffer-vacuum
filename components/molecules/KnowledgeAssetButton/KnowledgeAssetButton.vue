<template>
  <div
    class="knowledge-asset-button"
    :class="{ 'knowledge-asset-button--full': !preventFullWidth }"
  >
    <!-- TODO: Maybe find better solution to fix hydration -->
    <client-only>
      <LoadingSpinner :show="isLoading && useLoadingSpinner">
        <!-- register for webinar button -->
        <Button
          v-if="isFutureEvent && isWebinar"
          class="knowledge-asset-button__button"
          :label="isDetailPage ? $t('knowledge.webinar.button.join') : ''"
          variant="primary"
          icon="person_add"
          @click="
            () =>
              isLoggedIn
                ? registerForWebinar(webinarRegistrationId)
                : showLoginModal()
          "
        />

        <!-- watch webinar button -->
        <template v-else-if="isWebinar">
          <Button
            class="knowledge-asset-button__button"
            :label="isDetailPage ? $t('knowledge.webinar.button.watch') : ''"
            :disabled="!hasAsset"
            variant="primary"
            icon="play_circle_outline"
            @click="() => (isLoggedIn ? openAsset() : showLoginModal())"
          />
          <div v-if="!hasAsset && isDetailPage">
            {{ $t('knowledge.webinar.waitForVod') }}
          </div>
        </template>

        <!-- download whitepaper button -->
        <Button
          v-else-if="isWhitepaper && hasAsset"
          class="knowledge-asset-button__button"
          :label="
            isDetailPage ? $t('knowledge.whitepaper.button.download') : ''
          "
          variant="primary"
          icon="get_app"
          @click="() => (isLoggedIn ? openAsset() : showLoginModal())"
        />
      </LoadingSpinner>
    </client-only>
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
import Button from '~/components/atoms/Button/Button'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'KnowledgeAssetButton',
  components: {
    Button,
    LoadingSpinner,
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
    preventFullWidth: {
      type: Boolean,
      default: false,
    },
    useLoadingSpinner: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { i18n } = useContext()

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    const knowledgeStore = useKnowledgeStore()
    const { registerForWebinar } = knowledgeStore
    const { isModalOpen, isLoading } = storeToRefs(knowledgeStore)

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
      isModalOpen.value = true
    }

    return {
      buttonLabel,
      isWebinar,
      isWhitepaper,
      isFutureEvent,
      hasAsset,
      isLoggedIn,
      isModalOpen,
      isLoading,

      openAsset,
      showLoginModal,
      registerForWebinar,
    }
  },
})
</script>
<style lang="scss" scoped>
.knowledge-asset-button {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;

  &--full {
    @apply tw-w-full;
  }

  &__button {
    @apply tw-flex;
  }

  @screen md {
    @apply tw-flex-row;
    @apply tw-w-auto;

    &__button {
      @apply tw-w-auto;
    }
  }
}
</style>
