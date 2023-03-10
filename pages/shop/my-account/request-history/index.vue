<template>
  <div class="request-history">
    <ResultHeadline
      class="request-history__headline"
      :headline="$t('myaccount.requestHistory.yourHistory')"
      :link="localePath('shop-my-account')"
    />
    <GlobalMessage
      v-if="infoMessage"
      class="request-history__warning-unapproved"
      :description="infoMessage"
      variant="warning"
      :prevent-icon-change="true"
    />
    <div v-if="tableData.length && isApprovedUser">
      <GenericTable :header="header" :table-data="tableData" />
      <div class="request-history__pagination-wrapper">
        <Pagination :total-pages="totalPages" />
      </div>
    </div>
    <div v-else>
      <EmptyWrapper
        :label="$t('myaccount.requestHistory.lastRequestNotFound')"
        :button="button"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onServerPrefetch,
  useContext,
  computed,
  watch,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import GenericTable from '~/components/molecules/GenericTable/GenericTable'
import Pagination from '~/components/molecules/Pagination/Pagination'
import EmptyWrapper from '~/components/molecules/EmptyWrapper/EmptyWrapper'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'

import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    GenericTable,
    Pagination,
    ResultHeadline,
    EmptyWrapper,
    GlobalMessage,
  },
  setup() {
    const { i18n, app } = useContext()
    const route = useRoute()
    const userStore = useUserStore()

    const { isApprovedUser, isLeadUser, isOpenUser, isRejectedUser } =
      storeToRefs(userStore)

    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore

    const { requestHistory } = storeToRefs(requestHistoryStore)
    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

    const infoMessage = computed(() => {
      if (isOpenUser.value) {
        return i18n.t('myaccount.userStatus.open.functionalityInfo')
      }
      if (isLeadUser.value) {
        return i18n.t('myaccount.userStatus.lead.functionalityInfo')
      }
      if (isRejectedUser.value) {
        return i18n.t('myaccount.userStatus.rejected.functionalityInfo')
      }
      // Fallback for any case of not approved user that isn't covert by the cases above
      if (!isApprovedUser.value) {
        return i18n.t('myaccount.userStatus.rejected.functionalityInfo')
      }
      return null
    })

    const button = ref({
      icon: 'arrow_forward',
      size: 'normal',
      label: i18n.t('myaccount.requestHistory.goToProducts'),
      shape: 'outlined',
      variant: 'secondary',
      href: 'shop/categories',
      disabled: false,
      prependIcon: false,
    })

    const header = computed(() => [
      { title: i18n.t('myaccount.requestHistory.table.requestNumber') },
      { title: i18n.t('myaccount.requestHistory.table.requestReference') },
      { title: i18n.t('myaccount.requestHistory.table.date') },
      { title: i18n.t('myaccount.requestHistory.table.requestTotal') },
    ])

    const totalPages = computed(() => {
      return requestHistory?.value?.pagination?.totalPages
    })

    const tableData = computed(() => {
      const result = []

      if (requestHistory.value.orders) {
        for (const request of requestHistory.value.orders) {
          const entries = []

          entries.push({
            text: request.code,
            icon: 'description',
          })
          entries.push({
            text: request.customerReference || '-',
          })
          entries.push({
            text: i18n.d(new Date(request.placed), 'date'),
          })
          entries.push({
            text: request.total.formattedValue,
          })

          const actions = [
            {
              desktop: true,
              mobile: true,
              label: i18n.t('cart.details'),
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'plain',
              href: `${
                app.localePath('shop-my-account-request-history') +
                '/' +
                request.code
              }`,
              target: '_self',
            },
          ]

          result.push({
            entries,
            actions,
          })
        }
      }

      return result
    })

    watch(route, (newRoute) => {
      loadRequestHistory(newRoute.query.currentPage || 1)
    })

    return {
      requestHistory,
      header,
      infoMessage,
      tableData,
      totalPages,
      button,
      isApprovedUser,
    }
  },
})
</script>
<style lang="scss" scoped>
.request-history {
  &__warning-unapproved {
    @apply tw-mb-6;
  }

  &__headline {
    @apply tw-flex;
    @apply tw-items-center;
  }

  &__pagination-wrapper {
    @apply tw-flex;
    @apply tw-justify-center;
    @apply tw-mt-6;

    @screen md {
      @apply tw-justify-end;
    }
  }
}
</style>
