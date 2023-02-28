<template>
  <div class="knowledge-content">
    <KnowledgeNav v-if="isOverviewPage" />
    <ResultHeadline
      id="knowledge-results"
      class="knowledge-content__headline"
      :headline="resultHeadline"
      :result-count="245"
      :link="backLink"
    />
    <div
      class="tw-flex tw-justify-center tw-items-center tw-h-64 tw-bg-pv-grey-88 tw-font-bold tw-text-pv-white tw-text-4xl tw-rounded-2xl"
    >
      <!-- TODO: Remove placeholder with knowledge results -->
      Knowledge Results
    </div>
  </div>
</template>
<script>
import { computed, useRoute, useContext } from '@nuxtjs/composition-api'
import KnowledgeNav from '~/components/molecules/KnowledgeNav/KnowledgeNav'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'

export default {
  name: 'KnowledgeContent',
  components: {
    KnowledgeNav,
    ResultHeadline,
  },
  setup() {
    const route = useRoute()
    const { localePath, i18n } = useContext()

    const isWhitepapers = computed(() =>
      route.value.path.includes('whitepapers')
    )

    const isWebinars = computed(() => route.value.path.includes('webinars'))

    const isOverviewPage = computed(
      () => !isWhitepapers.value && !isWebinars.value
    )

    const resultHeadline = computed(() => {
      if (isWhitepapers.value) return i18n.t('knowledge.whitepapers')
      if (isWebinars.value) return i18n.t('knowledge.webinars')
      return i18n.t('knowledge.allRessources')
    })

    const backLink = computed(() =>
      !isOverviewPage.value ? localePath('knowledge') : null
    )

    return {
      isOverviewPage,
      resultHeadline,
      backLink,
    }
  },
}
</script>
<style lang="scss">
.knowledge-content {
  &__headline {
    @apply tw-mt-12;
  }
}
</style>
