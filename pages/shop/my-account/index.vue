<template>
  <div class="dashboard">
    <div class="headline-container">
      <SectionHeadline>
        {{ $t('myaccount.recentRequests') }}
      </SectionHeadline>
      <Button
        class="headline-container__link"
        :label="$t('myaccount.allRequests')"
        icon="arrow_forward"
        :href="localePath('shop-my-account-request-history')"
        variant="secondary"
        shape="plain"
      />
    </div>

    <GenericTable
      v-if="recentRequests"
      :header="recentRequestsTableHeader"
      :table-data="recentRequests"
    />
  </div>
</template>

<script>
import { defineComponent, useAsync } from '@nuxtjs/composition-api'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import { useDashboardStore } from '~/stores/myaccount'

export default defineComponent({
  name: 'Dashboard',
  components: {
    SectionHeadline,
  },
  setup() {
    const dashBoardStore = useDashboardStore()

    const recentRequests = useAsync(() => {
      return dashBoardStore.getRecentRequestsTableData()
    })

    const recentRequestsTableHeader = [
      {
        title: 'Request',
      },
      {
        title: 'Reference',
      },
      {
        title: 'Last edited',
      },
      {
        title: 'Total (net)',
      },
    ]

    return { recentRequests, recentRequestsTableHeader }
  },
})
</script>

<style lang="scss">
.headline-container {
  @apply tw-flex tw-justify-between;

  &__link {
    @apply tw-text-pv-red;
    @apply tw-flex-1;

    .button__label {
      @apply tw-invisible;
      @apply tw-opacity-0;

      @screen md {
        @apply tw-visible;
        @apply tw-opacity-100;
      }
    }
  }
}
</style>
