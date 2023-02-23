<template>
  <div>
    <ResultHeadline
      :headline="$t('myaccount.serviceHistory.serviceRequests')"
    />
    <EmptyWrapper :label="$t('myaccount.comingSoon')" icon="handyman" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'

export default defineComponent({
  name: 'ServiceRequests',
  components: { ResultHeadline, EmptyWrapper },
})
</script>
