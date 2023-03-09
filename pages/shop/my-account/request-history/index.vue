<template>
  <div class="request-history">
    <ResultHeadline
      class="request-history__headline--desktop"
      :headline="$t('myaccount.requestHistory.yourHistory')"
    />
    <ResultHeadline
      class="request-history__headline--mobile"
      :headline="$t('myaccount.requestHistory.yourHistory')"
      :link="localePath('shop-my-account')"
    />
    <div v-if="tableData.length">
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
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    GenericTable,
    Pagination,
    ResultHeadline,
    EmptyWrapper,
  },
  setup() {
    const { i18n, app } = useContext()
    const route = useRoute()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore

    const { requestHistory } = storeToRefs(requestHistoryStore)
    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

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

    return { requestHistory, header, tableData, totalPages, button }
  },
})
</script>
<style lang="scss" scoped>
.request-history {
  &__headline {
    &--desktop {
      @apply tw-hidden;

      @screen lg {
        @apply tw-flex;
      }
    }

    &--mobile {
      @apply tw-flex;
      @apply tw-items-center;

      @screen lg {
        @apply tw-hidden;
      }
    }
  }

  &__pagination-wrapper {
    @apply tw-flex;
    @apply tw-justify-end;
    @apply tw-mt-6;
  }
}
</style>
