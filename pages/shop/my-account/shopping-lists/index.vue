<template>
  <div class="shopping-list-overview-page">
    <div class="shopping-list-overview-page__header">
      <ResultHeadline
        class="shopping-list-overview-page__header--headline"
        :headline="$t('myaccount.shoppingListOverviewPage.title')"
        :link="localePath('shop-my-account')"
      />
      <div
        v-if="!isShoppingListEmpty"
        class="shopping-list-overview-page__header--nav"
      >
        <Button
          class="shopping-list-overview-page__header--nav__select"
          :icon="isSelectedListEmpty ? 'list' : 'close'"
          shape="outlined"
          gap="narrow"
          :label="
            isSelectedListEmpty
              ? $t('myaccount.select')
              : $t('myaccount.shoppingListOverviewPage.discard')
          "
          variant="secondary"
          @click="toggleSelectMode"
        />
        <Button
          class="shopping-list-overview-page__header--nav__new"
          :icon="isSelectedListEmpty ? 'add' : 'delete'"
          gap="narrow"
          :label="
            isSelectedListEmpty
              ? textBySizeNew
              : $t('myaccount.shoppingListOverviewPage.deleteList')
          "
          variant="secondary"
          @click="createDeleteLists"
        />
      </div>
    </div>
    <div v-if="isShoppingListEmpty" class="shopping-list-overview-page__empty">
      <Icon
        class="shopping-list-overview-page__empty--icon"
        icon="assignment"
        size="xlarge"
      />
      <p class="shopping-list-overview-page__empty--text">
        {{ $t('myaccount.shoppingListOverviewPage.emptyList') }}
      </p>
      <Button
        class="shopping-list-overview-page__empty--new"
        icon="add"
        gap="narrow"
        shape="outlined"
        :label="$t('myaccount.newLists')"
        variant="secondary"
        @click="createDeleteLists"
      />
    </div>
    <ShoppingListTable
      v-if="!isShoppingListEmpty"
      class="shopping-list-overview-page__table"
      :lists="shoppingListsByPage"
      :select-mode="isSelectMode"
      @delete="deleteShoppingList"
      @update="updateSelectedLists"
      @details="details"
    />
    <Pagination
      v-if="!isShoppingListEmpty"
      class="shopping-list-overview-page__pagination"
      :total-pages="totalPages"
    />
    <Button
      shape="plain"
      variant="secondary"
      class="shopping-list-overview-page__back-button"
      :label="$t('myaccount.backToDashboard')"
      icon="arrow_back"
      :prepend-icon="true"
      gap="narrow"
      @click="goToMyAccount"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  ref,
  useRouter,
  useRoute,
  watch,
  onMounted,
} from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import ShoppingListTable from '~/components/molecules/ShoppingListTable/ShoppingListTable.vue'
import { useShoppingLists } from '~/stores/shoppinglists'
import { storeToRefs } from 'pinia'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'

export default defineComponent({
  name: 'ShoppingListOverviewPage',
  components: { Button, ShoppingListTable, Pagination, Icon, ResultHeadline },
  emits: ['details'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const router = useRouter()
    const route = useRoute()
    const { isMobile } = app.$breakpoints
    const isSelectMode = ref(false)
    const shoppingListsStore = useShoppingLists()
    const { shoppingLists } = storeToRefs(shoppingListsStore)
    const selectedList = ref([])
    const currentPage = ref(1)
    const ITEMS_PER_PAGE = 7
    const totalPages = computed(() => {
      return Math.ceil(shoppingLists.value.length / ITEMS_PER_PAGE)
    })

    const shoppingListsByPage = computed(() => {
      return shoppingLists.value.slice(
        (currentPage.value - 1) * ITEMS_PER_PAGE,
        currentPage.value * ITEMS_PER_PAGE
      )
    })

    const toggleSelectMode = () => {
      isSelectMode.value = !isSelectMode.value
      if (!isSelectMode.value) {
        clearSelectedLists()
      }
    }
    const textBySizeNew = computed(() => {
      return isMobile.value
        ? i18n.t('myaccount.newMobile')
        : i18n.t('myaccount.new')
    })

    const createDeleteLists = () => {
      if (isSelectMode.value) {
        deleteSelectedLists()
      } else {
        shoppingListsStore.newListMode()
        shoppingListsStore.toggleOverlay()
      }
    }

    const updateSelectedLists = (shoppingList) => {
      if (shoppingList.selected) {
        selectedList.value.push(shoppingList.list)
      } else {
        selectedList.value = selectedList.value.filter(
          (list) => list.id !== shoppingList.list.id
        )
      }
    }

    const clearSelectedLists = () => {
      selectedList.value = []
    }

    const deleteShoppingList = async (shoppingList) => {
      const id = shoppingList?.id
      await shoppingListsStore.deleteShoppingList(id)
    }

    const deleteSelectedLists = () => {
      selectedList.value.forEach(async (shoppingList) => {
        await shoppingListsStore.deleteShoppingList(shoppingList.id)
      })
      toggleSelectMode()
    }

    const isSelectedListEmpty = computed(() => {
      return selectedList.value.length === 0
    })

    const isShoppingListEmpty = computed(() => {
      return shoppingLists.value.length === 0
    })

    const goToMyAccount = () => {
      router.push({
        path: app.localePath('shop-my-account'),
      })
    }

    const setCurrentPage = () => {
      const queryPage = route.value?.query?.currentPage
      if (queryPage && queryPage <= totalPages.value) {
        currentPage.value = queryPage
      }
      if (queryPage && queryPage > totalPages.value) {
        currentPage.value = totalPages.value - 1
      }
    }

    const details = (listItem) => {
      emit('details', listItem)
    }

    watch(route, () => {
      setCurrentPage()
    })

    onMounted(() => {
      setCurrentPage()
    })

    return {
      textBySizeNew,
      toggleSelectMode,
      shoppingLists,
      isSelectMode,
      createDeleteLists,
      deleteShoppingList,
      updateSelectedLists,
      deleteSelectedLists,
      isSelectedListEmpty,
      isShoppingListEmpty,
      goToMyAccount,
      totalPages,
      shoppingListsByPage,
      details,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-overview-page {
  @apply tw-flex;
  @apply tw-flex-col;

  &__header {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mb-4;

    @screen md {
      @apply tw-flex-row;
      @apply tw-items-start;
      @apply tw-mb-6;
    }

    @screen lg {
      @apply tw-mb-8;
    }

    &--headline {
      @screen md {
        @apply tw-my-auto;
      }
    }

    &--nav {
      @apply tw-flex;
      @apply tw-flex-col;

      @screen md {
        @apply tw-flex-row;
        @apply tw-ml-auto;
        @apply tw-my-auto;
      }

      &__select {
        @apply tw-hidden;
        @apply tw-min-w-fit;

        @screen md {
          @apply tw-flex;
          @apply tw-ml-auto;
          @apply tw-mr-2;
          @apply tw-w-[123px];
        }

        @screen lg {
          @apply tw-w-[86px];
        }
      }

      &__new {
        @apply tw-min-w-fit;

        @screen md {
          @apply tw-w-[123px];
        }

        @screen lg {
          @apply tw-w-[86px];
        }
      }
    }
  }

  &__empty {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-bg-pv-grey-96;
    @apply tw-p-6;
    @apply tw-rounded-lg;

    &--icon {
      @apply tw-text-pv-grey-80;
    }

    &--text {
      @apply tw-text-center;
      @apply tw-text-sm;
      @apply tw-font-bold;
      @apply tw-mt-4;
    }

    &--new {
      @apply tw-mt-4;
      @apply tw-text-pv-grey-16;
    }
  }

  &__pagination {
    @apply tw-mt-6;
    @apply tw-w-full;

    @screen md {
      @apply tw-mt-4;
      @apply tw-w-fit;
      @apply tw-ml-auto;
    }

    .pagination__list {
      @apply tw-w-full;
    }

    .pagination__icon {
      @apply tw-h-12;
      @apply tw-w-12;

      @screen md {
        @apply tw-h-10;
        @apply tw-w-10;
      }
    }

    .pagination__counter {
      @apply tw-h-12;
      @apply tw-w-full;
    }
  }

  &__back-button {
    @apply tw-mt-6;
    @apply tw-mx-auto;

    @screen md {
      @apply tw-hidden;
    }
  }
}
</style>
