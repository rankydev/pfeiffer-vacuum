<template>
  <div class="shopping-list-detail-page">
    <div
      class="shopping-list-detail-page__header"
      :class="{ 'shopping-list-detail-page__header-active': isEditMode }"
    >
      <ResultHeadline
        v-if="!isEditMode"
        class="shopping-list-detail-page__header--headline"
        :headline="nameVar"
        :link="localePath('shop-my-account')"
      />
      <PvInput
        v-if="isEditMode"
        v-model="nameVar"
        class="shopping-list-detail-page__header-active--edit-name"
        :label="$t('myaccount.shoppingList.name')"
        :required="true"
        :placeholder="$t('myaccount.shoppingList.namePlaceholder')"
      />
      <PvTextArea
        v-if="isEditMode"
        v-model="descriptionVar"
        class="shopping-list-detail-page__header-active--edit-description"
        :label="$t('myaccount.shoppingList.description')"
        :placeholder="$t('myaccount.descriptionOptional')"
        :is-textarea="true"
      />
      <div
        class="shopping-list-detail-page__header--nav"
        :class="{ 'shopping-list-detail-page__header-active--nav': isEditMode }"
      >
        <Button
          class="shopping-list-detail-page__header--nav__select"
          :class="{
            'shopping-list-detail-page__header-active--nav__select': isEditMode,
          }"
          :icon="isEditMode ? 'close' : 'edit'"
          shape="outlined"
          gap="narrow"
          :label="
            isEditMode
              ? $t('myaccount.shoppingListOverviewPage.discard')
              : $t('myaccount.editList')
          "
          variant="secondary"
          @click="changeButton"
        />
        <Button
          class="shopping-list-detail-page__header--nav__new"
          :class="{
            'shopping-list-detail-page__header-active--nav__new': isEditMode,
          }"
          :icon="isEditMode ? 'save' : 'delete'"
          gap="narrow"
          :label="
            isEditMode
              ? $t('myaccount.saveChanges')
              : $t('myaccount.shoppingListOverviewPage.deleteList')
          "
          variant="secondary"
          @click="actionButton"
        />
      </div>
    </div>
    <div class="shopping-list-detail-page__list">
      <h3 class="shopping-list-detail-page__list--title">
        {{ $t('cart.articleList') }}
      </h3>
      <ShoppingList
        class="shopping-list-detail-page__list--list"
        :products="products"
        :is-sortable="true"
        @update="updateProduct"
        @delete="deleteProduct"
      />
    </div>
    <div class="shopping-list-detail-page__bottom-nav">
      <Button
        class="shopping-list-detail-page__bottom-nav--add-to-cart"
        icon="shopping_cart"
        :label="$t('myaccount.addAllToCart')"
        @click="addAllToCart"
      />
      <Button
        shape="plain"
        variant="secondary"
        class="shopping-list-detail-page__bottom-nav--back"
        :label="$t('myaccount.backToOverview')"
        icon="arrow_back"
        :prepend-icon="true"
        gap="narrow"
        @click="goToShoppingListOverview"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useRouter,
  ref,
  useRoute,
  onMounted,
  computed,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea.vue'
import { useShoppingLists } from '~/stores/shoppinglists'
import ShoppingList from '~/components/molecules/ShoppingList/ShoppingList.vue'
export default defineComponent({
  name: 'ShoppingListDetailPage',
  components: {
    PvInput,
    Button,
    ResultHeadline,
    PvTextArea,
    ShoppingList,
  },
  setup() {
    const { app } = useContext()
    const router = useRouter()
    const route = useRoute()
    const shoppingListsStore = useShoppingLists()
    const nameVar = ref('')
    const descriptionVar = ref('')
    const isEditMode = ref(false)

    const shoppingList = ref({})

    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value
    }
    const goToShoppingListOverview = () => {
      router.push({
        path: app.localePath('shop-my-account-shopping-lists'),
      })
    }

    const updateProduct = async (cartItem) => {
      const id = route?.value?.params?.list
      const code = cartItem?.code
      const quantity = cartItem?.quantity
      await shoppingListsStore.updateQuantity(id, code, quantity)
    }

    const products = computed(() => {
      return shoppingList.value?.entries || []
    })

    const addAllToCart = async () => {
      const id = route?.value?.params?.list
      await shoppingListsStore.addListToCart(id)
    }

    const deleteShoppingList = () => {
      const id = route?.value?.params?.list
      shoppingListsStore.deleteShoppingList(id)
      goToShoppingListOverview()
    }

    const initShoppingList = () => {
      const id = route?.value?.params?.list
      shoppingList.value = shoppingListsStore.getShoppingListById(id)
      nameVar.value = shoppingList.value?.name || ''
      descriptionVar.value = shoppingList.value?.description || ''
    }

    const updateShoppingList = async () => {
      const id = route?.value?.params?.list
      await shoppingListsStore.updateShoppingList(
        id,
        nameVar.value,
        descriptionVar.value
      )
    }

    const actionButton = async () => {
      if (isEditMode.value && nameVar.value) {
        await updateShoppingList()
        toggleEditMode()
      } else {
        deleteShoppingList()
      }
    }

    const deleteProduct = async (cartItem) => {
      const id = route?.value?.params?.list
      const code = cartItem?.code
      await shoppingListsStore.deleteEntry(id, code)
    }

    const changeButton = () => {
      toggleEditMode()
    }

    onMounted(() => {
      initShoppingList()
    })
    return {
      nameVar,
      descriptionVar,
      isEditMode,
      toggleEditMode,
      goToShoppingListOverview,
      products,
      updateProduct,
      addAllToCart,
      deleteShoppingList,
      actionButton,
      changeButton,
      deleteProduct,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-detail-page {
  @apply tw-flex;
  @apply tw-flex-col;

  &__header {
    @apply tw-grid;

    @screen md {
      @apply tw-items-start;
    }

    &--headline {
      @apply tw-flex;
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-1 tw-col-end-13;
      @apply tw-mb-0;

      @screen md {
        @apply tw-col-start-1 tw-col-end-11;
        @apply tw-my-auto;
      }
    }

    &--nav {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-row-start-2 tw-row-end-3;
      @apply tw-col-start-1 tw-col-end-13;
      @apply tw-mt-6;

      @screen md {
        @apply tw-flex-row;
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-11 tw-col-end-13;
        @apply tw-mt-0;
        @apply tw-ml-auto;
      }

      &__select {
        @apply tw-mb-4;
        @apply tw-min-w-fit;
        @apply tw-w-[123px];

        @screen md {
          @apply tw-mb-0;
          @apply tw-mr-2;
        }

        @screen lg {
          @apply tw-w-fit;
        }
      }

      &__new {
        @apply tw-min-w-fit;
        @apply tw-w-[123px];

        @screen lg {
          @apply tw-w-fit;
        }
      }
    }
  }

  &__header-active {
    &--edit-name {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-row-start-2 tw-row-end-3;
      @apply tw-col-start-1 tw-col-end-13;
      @apply tw-mt-6;

      @screen md {
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-1 tw-col-end-11;
        @apply tw-mt-0;
        @apply tw-max-w-[280px];
      }

      @screen lg {
        @apply tw-max-w-[420px];
      }
    }

    &--edit-description {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-row-start-3 tw-row-end-4;
      @apply tw-col-start-1 tw-col-end-13;
      @apply tw-mt-4;

      .pv-textarea__input {
        @apply tw-h-28;
      }
    }

    &--nav {
      @apply tw-row-start-4 tw-row-end-5;
      @apply tw-mt-4;

      @screen md {
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-11 tw-col-end-13;
        @apply tw-mt-0;
        @apply tw-ml-auto;
      }

      &__select {
        @apply tw-w-auto;
      }

      &__new {
        @apply tw-w-auto;
      }
    }
  }

  &__list {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-mt-6;

    @screen md {
      @apply tw-mt-8;
    }

    &--title {
      @apply tw-mt-6;
      @apply tw-text-lg;
      @apply tw-leading-7;
      @apply tw-pb-4;
      @apply tw-border-b tw-border-b-pv-grey-80;

      @screen md {
        @apply tw-mt-0;
      }

      @screen lg {
        @apply tw-text-xl;
        @apply tw-leading-9;
      }
    }

    &--list {
      @apply tw-mt-4;
    }
  }

  &__bottom-nav {
    @apply tw-flex;
    @apply tw-flex-col;

    @screen md {
      @apply tw-flex-row-reverse;
      @apply tw-mt-6;
    }

    &--add-to-cart {
      @apply tw-mt-4;

      @screen md {
        @apply tw-mt-0;
        @apply tw-ml-auto;
      }
    }

    &--back {
      @apply tw-mt-4;
      @apply tw-w-fit;
      @apply tw-mx-auto;

      @screen md {
        @apply tw-mt-0;
        @apply tw-ml-0;
      }
    }
  }
}
</style>
