<template>
  <client-only>
    <LoadingSpinner :show="isLoading">
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
            :secondary="{
              position: 3,
              active: true,
            }"
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
            :secondary="{
              position: 2,
              active: true,
            }"
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
            <InformationBox
              v-if="isApprovedUser"
              :content="companyDataContent"
            />
          </div>
        </section>
      </div>
    </LoadingSpinner>
  </client-only>
</template>

<script>
import {
  defineComponent,
  onServerPrefetch,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { useDashboardStore } from '~/stores/myaccount'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper.vue'
import InformationBox from '~/components/molecules/InformationBox/InformationBox.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

export default defineComponent({
  components: {
    SectionHeadline,
    EmptyWrapper,
    InformationBox,
    LoadingSpinner,
  },
  setup() {
    const dashBoardStore = useDashboardStore()
    const userStore = useUserStore()

    const {
      recentRequestsTableHeader,
      recentShoppingListTableHeader,
      recentShoppingListHeader,
      accountDataContent,
      companyDataContent,
      buttons,
      isLoading,
      recentRequests,
      recentShoppingLists,
    } = storeToRefs(dashBoardStore)

    const { isApprovedUser } = storeToRefs(userStore)

    const { getDashboardData } = dashBoardStore

    onServerPrefetch(getDashboardData)
    onBeforeMount(getDashboardData)

    return {
      recentRequests,
      recentRequestsTableHeader,
      recentShoppingLists,
      recentShoppingListTableHeader,
      buttons,
      recentShoppingListHeader,
      accountDataContent,
      companyDataContent,
      isApprovedUser,
      isLoading,
    }
  },
})
</script>

<style lang="scss">
.dashboard {
  .section {
    @apply tw-mb-4;

    @screen lg {
      @apply tw-mb-8;
    }

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
      @apply tw-grid tw-grid-cols-2;
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
