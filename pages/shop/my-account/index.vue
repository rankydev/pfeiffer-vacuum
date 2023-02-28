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
        :button="buttons.emptyWrapper.recentRequests"
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
      <EmptyWrapper
        v-else
        icon="assignment"
        label="myaccount.shoppingList.noShoppingLists"
        :button="buttons.emptyWrapper.shoppingList"
      />
    </section>

    <section class="section">
      <SectionHeadline>{{
        $t('myaccount.installedBase.installedBase')
      }}</SectionHeadline>

      <p>{{ $t('myaccount.installedBase.underline2') }}</p>
      <Button
        :label="$t('myaccount.installedBase.installedBase')"
        icon="arrow_forward"
        variant="secondary"
        shape="outlined"
      />
      <Button icon="add" variant="secondary" shape="filled" />
    </section>
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { useDashboardStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Dashboard',
  components: {
    SectionHeadline,
    EmptyWrapper,
    Button,
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

    const buttons = {
      emptyWrapper: {
        recentRequests: {
          size: 'normal',
          label: i18n.t('myaccount.goToProducts'),
          shape: 'outlined',
          variant: 'secondary',
        },
        shoppingList: {
          size: 'normal',
          label: i18n.t('myaccount.shoppingList.new'),
          shape: 'outlined',
          variant: 'secondary',
          icon: 'add',
        },
      },
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

  .section-headline {
    @screen md {
      @apply tw-mb-4;
    }

    &__buttons {
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
}
</style>
