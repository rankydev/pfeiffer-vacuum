<template>
  <div>
    <ResultHeadline :headline="$t('myaccount.installedBase.installedBase')" />
    <EmptyWrapper
      :label="$t('myaccount.comingSoon')"
      icon="dashboard_customize"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'

export default defineComponent({
  name: 'InstalledBase',
  components: { ResultHeadline, EmptyWrapper },
})
</script>
