<template>
  <div class="dashboard">
    <SectionHeadline :buttons="buttons.recentRequestButtons">
      {{ $t('myaccount.recentRequests') }}
    </SectionHeadline>

    <GenericTable
      v-if="recentRequests"
      :header="recentRequestsTableHeader"
      :table-data="recentRequests"
    />
    <EmptyWrapper
      v-else
      :button="button"
      :label="$t('myaccount.lastRequestNotFound')"
    />

    <div class="headline-container">
      <SectionHeadline :buttons="buttons.recentShoppingListsButtons">{{
        $t('myaccount.recentShoppingLists')
      }}</SectionHeadline>
    </div>
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
    const { i18n, localePath } = useContext()
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

    const buttons = {
      recentRequestButtons: [
        {
          label: i18n.t('myaccount.allRequests'),
          icon: 'arrow_forward',
          href: localePath('shop-my-account-request-history'),
          variant: 'secondary',
          shape: 'plain',
        },
      ],
      recentShoppingListsButtons: [
        {
          variant: 'secondary',
          shape: 'plain',
          label: 'Button left',
          icon: 'add',
        },
        {
          variant: 'secondary',
          shape: 'plain',
          label: 'Button right',
          icon: 'arrow_forward',
        },
      ],
    }

    return {
      recentRequests,
      recentRequestsTableHeader,
      button,
      buttons,
    }
  },
})
</script>

<style lang="scss">
.dashboard {
  .button__label {
    @apply tw-invisible;
    @apply tw-opacity-0;

    @screen md {
      @apply tw-visible;
      @apply tw-opacity-100;
    }
  }
}
</style>
