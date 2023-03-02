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

export default {
  name: 'KnowledgeDetails',
  components: { KnowledgeStage },
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

    onBeforeMount(getHybrisData)
    onServerPrefetch(getHybrisData)

    return { hybrisContent, isWhitepaper }
  },
}
</script>
<style lang="scss">
.knowledge-details {
  &__stage {
    @apply tw-mb-12;
  }
}
</style>
