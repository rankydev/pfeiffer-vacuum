<template>
  <div class="knowledge-details">
    <KnowledgeStage
      class="knowledge-details__stage"
      :is-whitepaper="isWhitepaper"
      :is-detail-page="true"
      :headline="content.title"
      :summary="content.summary"
      :image="content.image"
      :date="hybrisContent.date"
      :duration="hybrisContent.duration"
      :asset-url="hybrisContent.assetURL"
      :webinar-registration-id="isWhitepaper ? null : hybrisContent.id"
    />
    <nuxt-dynamic
      v-for="item in content.pageComponents"
      :key="item._uid"
      v-editable="item"
      v-bind="item"
      :name="item.uiComponent || item.component"
    />
    <KnowledgeAssetButton
      class="knowledge-details__asset-button-bottom"
      :type="isWhitepaper ? 'WHITEPAPER' : 'WEBINAR'"
      :webinar-registration-id="isWhitepaper ? null : hybrisContent.id"
      :date="hybrisContent.date"
      :asset-url="hybrisContent.assetURL"
      :is-detail-page="true"
      :use-loading-spinner="true"
    />
    <Button
      class="knowledge-details__back-to-overview"
      label="Back to overview"
      :prepend-icon="true"
      icon="arrow_back"
      variant="secondary"
      shape="plain"
      :href="localePath('/knowledge')"
    />
    <KnowledgeModal :is-open="isModalOpen" @closeModal="toggleModal(false)" />
  </div>
</template>
<script>
import {
  computed,
  onBeforeMount,
  onServerPrefetch,
  ref,
  toRefs,
} from '@nuxtjs/composition-api'
import { useKnowledgeStore } from '~/stores/knowledge'
import { useRoute } from '@nuxtjs/composition-api'
import KnowledgeStage from '~/components/molecules/KnowledgeStage/KnowledgeStage'
import KnowledgeAssetButton from '~/components/molecules/KnowledgeAssetButton/KnowledgeAssetButton'
import KnowledgeModal from '~/components/molecules/KnowledgeModal/KnowledgeModal'
import Button from '~/components/atoms/Button/Button'
import { storeToRefs } from 'pinia'

export default {
  name: 'KnowledgeDetails',
  components: { KnowledgeStage, KnowledgeAssetButton, KnowledgeModal, Button },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const route = useRoute()
    const { content } = toRefs(props)

    const knowledgeStore = useKnowledgeStore()
    const { isModalOpen } = storeToRefs(knowledgeStore)
    const hybrisContent = ref({})

    const isWhitepaper = computed(
      () => content.value.knowledgeType === 'whitepaper'
    )

    const getHybrisData = async () => {
      const res = await knowledgeStore.getHybrisDetails(
        content.value.knowledgeType,
        route.value.params?.whitepaper || route.value.params?.webinar || ''
      )
      hybrisContent.value = res
    }

    const toggleModal = (state) => (isModalOpen.value = state)

    onBeforeMount(getHybrisData)
    onServerPrefetch(getHybrisData)

    return {
      hybrisContent,
      isWhitepaper,
      isModalOpen,

      toggleModal,
    }
  },
}
</script>
<style lang="scss">
.knowledge-details {
  &__stage {
    @apply tw-mb-12;
  }

  &__asset-button-bottom {
    @apply tw-mt-6;
  }

  &__back-to-overview {
    @apply tw-w-full;
    @apply tw-justify-center;
    @apply tw-mt-4;

    @screen md {
      @apply tw-hidden;
    }
  }
}
</style>
