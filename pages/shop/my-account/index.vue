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

    <template v-if="recentRequests">
      <GenericTable
        :header="recentRequestsTableHeader"
        :table-data="recentRequests"
      />
    </template>
    <template v-else>
      <EmptyWrapper
        :button="button"
        :label="$t('myaccount.lastRequestNotFound')"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import { useDashboardStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Dashboard',
  components: {
    SectionHeadline,
    EmptyWrapper,
  },
  setup() {
    const { i18n } = useContext()
    const dashBoardStore = useDashboardStore()
    const { recentRequestsTableHeader } = storeToRefs(dashBoardStore)

    const recentRequests = useAsync(() => {
      return dashBoardStore.getRecentRequestsTableData()
    })

    const button = {
      size: 'normal',
      label: i18n.t('myaccount.goToProducts'),
      shape: 'outlined',
      variant: 'secondary',
      prependIcon: false,
    }
    console.log('recentRequestsTableHeader', recentRequestsTableHeader)

    return { recentRequests, recentRequestsTableHeader, button }
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
