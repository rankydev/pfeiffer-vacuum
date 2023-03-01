<template>
  <div class="dashboard">
    <section class="section">
      <SectionHeadline :buttons="buttons.recentRequestButtons">
        {{ $t('myaccount.recentRequests.recentRequests') }}
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
        :label="$t('myaccount.recentRequests.lastRequestNotFound')"
      />
    </section>

    <section class="section">
      <SectionHeadline :buttons="buttons.recentShoppingListsButtons">{{
        $t('myaccount.shoppingList.recentShoppingLists')
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

    <section class="section section--last">
      <div class="information__data">
        <InformationBox :content="accountDataContent" />
        <InformationBox :content="companyDataContent" />
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import InformationBox from '~/components/molecules/InformationBox/InformationBox.vue'
import { useDashboardStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Dashboard',
  components: {
    SectionHeadline,
    EmptyWrapper,
    InformationBox,
  },
  setup() {
    const { i18n, localePath } = useContext()
    const dashBoardStore = useDashboardStore()
    const {
      recentRequestsTableHeader,
      recentShoppingListTableHeader,
      recentShoppingListHeader,
      accountDataContent,
      companyDataContent,
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
          label: i18n.t('myaccount.recentRequests.goToProducts'),
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
          label: i18n.t('myaccount.recentRequests.allRequests'),
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
      accountDataContent,
      companyDataContent,
    }
  },
})
</script>

<style lang="scss">
.dashboard {
  .section {
    @apply tw-mb-8;

    &--last {
      @apply tw-mb-0;
    }
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

  .information__data {
    @screen md {
      @apply tw-flex;
      @apply tw-gap-6;
    }

    @screen lg {
      @apply tw-gap-8;
    }

    .information-box {
      @apply tw-w-full;

      &:first-of-type {
        @apply tw-mb-6;

        @screen md {
          @apply tw-mb-0;
        }
      }
    }
  }
}
</style>
