<template>
  <div class="dashboard">
    <section class="section">
      <SectionHeadline :buttons="buttons.recentRequestButtons">
        {{ $t('myaccount.recentRequests') }}
      </SectionHeadline>

      <GenericTable
        v-if="recentRequests"
        :header="recentRequestsTableHeader"
        :table-data="recentRequests"
        :carousel="true"
      />
      <EmptyWrapper
        v-else
        :button="button"
        :label="$t('myaccount.lastRequestNotFound')"
      />
    </section>

    <section class="section">
      <SectionHeadline :buttons="buttons.recentShoppingListsButtons">{{
        $t('myaccount.recentShoppingLists')
      }}</SectionHeadline>

      <GenericTable
        v-if="recentShoppingLists"
        :header="recentShoppingListTableHeader"
        :table-data="recentShoppingLists"
        :carousel="true"
      />
    </section>
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
    const {
      recentRequestsTableHeader,
      recentShoppingListTableHeader,
      recentShoppingListHeader,
    } = storeToRefs(dashBoardStore)

    const recentRequests = useAsync(() => {
      return dashBoardStore.getRecentRequestsTableData()
    })

    const recentShoppingLists = useAsync(() => {
      return dashBoardStore.getRecentShoppingListsTableData()
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
          label: i18n.t('myaccount.shoppingList.new'),
          icon: 'add',
          desktopOnly: true,
        },
        {
          label: i18n.t('myaccount.shoppingList.all'),
          icon: 'arrow_forward',
          href: localePath('shop-my-account-shopping-lists'),
          variant: 'secondary',
          shape: 'plain',
        },
      ],
    }

    return {
      recentRequests,
      recentRequestsTableHeader,
      recentShoppingLists,
      recentShoppingListTableHeader,
      button,
      buttons,
      recentShoppingListHeader,
    }
  },
})
</script>

<style lang="scss">
.dashboard {
  .section {
    @apply tw-mb-8;
  }

  .section-headline__buttons {
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
