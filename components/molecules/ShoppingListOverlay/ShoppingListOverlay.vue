<template>
  <GenericSidebar
    :is-open="isOverlayOpen"
    position="right"
    class="shopping-list-overlay"
    @closeSidebar="clickAway"
  >
    <div class="shopping-list-overlay__header">
      <h2 class="shopping-list-overlay__header--title">
        <span>
          {{
            isBasicMode
              ? $t('myaccount.shoppingList.selectAList')
              : $t('myaccount.shoppingList.addNewList')
          }}
        </span>
        <span
          v-if="shoppingLists.length && isBasicMode"
          class="shopping-list-overlay__header--title-count"
        >
          ({{ shoppingLists.length }})
        </span>
      </h2>
    </div>
    <LoadingSpinner
      :show="isInitialLoad"
      class="shopping-list-overlay__loading"
    >
      <div
        v-if="shoppingLists.length && isBasicMode"
        class="shopping-list-overlay__content"
      >
        <Button
          v-for="{ name, id } in shoppingLists"
          :key="id"
          :label="name"
          icon="assignment"
          shape="outlined"
          prepend-icon
          variant="variant-selection-preselected"
          class="shopping-ist-overlay__content--item"
          @click="addToShoppingList(id)"
        />
      </div>
      <div
        v-if="!shoppingLists.length && isBasicMode && !isInitialLoad"
        class="shopping-list-overlay__content-empty"
      >
        <Icon
          class="shopping-list-overview-page__empty--icon"
          icon="assignment"
          size="xlarge"
        />
        <p class="shopping-list-overview-page__empty--text">
          {{ $t('myaccount.shoppingListOverviewPage.emptyList') }}
        </p>
      </div>
      <div v-if="!isBasicMode" class="shopping-list-overlay__content-add">
        <p class="shopping-list-overlay__content-add--inforamtion">
          {{ $t('myaccount.shoppingList.info') }}
        </p>
        <PvInput
          v-model="nameVar"
          class="shopping-list-overlay__content-add--name"
          :label="$t('myaccount.shoppingList.name')"
          :required="true"
          :placeholder="$t('myaccount.shoppingList.namePlaceholder')"
        />
        <PvTextArea
          v-model="descriptionVar"
          class="shopping-list-overlay__content-add--description"
          :label="$t('myaccount.shoppingList.description')"
          :placeholder="$t('myaccount.shoppingList.descriptionPlaceholder')"
          :is-textarea="true"
        />
      </div>
    </LoadingSpinner>
    <div class="shopping-list-overlay__footer">
      <Button
        class="shopping-list-overlay__footer--forward"
        :label="forwardButtonText"
        :icon="isAddMode ? 'save' : 'add'"
        shape="filled"
        variant="secondary"
        @click="handleForward"
      />
      <Button
        class="shopping-list-overlay__footer--back"
        :label="
          isAddMode
            ? $t('myaccount.shoppingList.back')
            : $t('myaccount.shoppingList.close')
        "
        :icon="isAddMode ? 'arrow_back' : 'close'"
        shape="outlined"
        :prepend-icon="isAddMode"
        variant="secondary"
        @click="handleBack"
      />
    </div>
  </GenericSidebar>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import GenericSidebar from '~/components/molecules/GenericSidebar/GenericSidebar.vue'
import { useShoppingLists } from '~/stores/shoppinglists'
import Button from '~/components/atoms/Button/Button.vue'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'

import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ShoppingListOverlay',
  components: {
    PvTextArea,
    PvInput,
    GenericSidebar,
    Button,
    LoadingSpinner,
  },
  setup() {
    const { i18n } = useContext()
    const nameVar = ref('')
    const descriptionVar = ref('')
    const shoppingListsStore = useShoppingLists()
    const {
      shoppingLists,
      isOverlayOpen,
      isAddMode,
      isNewListMode,
      isBasicMode,
      isAddAllMode,
      isInitialLoad,
    } = storeToRefs(shoppingListsStore)

    const clearForm = () => {
      nameVar.value = ''
      descriptionVar.value = ''
    }

    const closeSidebar = () => {
      shoppingListsStore.toggleOverlay()
    }

    const clickAway = () => {
      shoppingListsStore.toggleOverlay()
      resetStates()
    }

    const resetStates = () => {
      clearForm()
      shoppingListsStore.basicMode()
    }

    const newShoppingList = async () => {
      if (!nameVar.value) {
        return
      }
      closeSidebar()
      if (isAddMode.value && !isAddAllMode.value) {
        await shoppingListsStore.createNewListAndAddProduct(
          nameVar.value,
          descriptionVar.value
        )
      }
      if (isAddMode.value && isAddAllMode.value) {
        const list = await shoppingListsStore.createNewList(
          nameVar.value,
          descriptionVar.value
        )
        const listId = list?.id
        await shoppingListsStore.saveCartToShoppingList(listId)
      }
      if (isNewListMode.value) {
        await shoppingListsStore.createNewList(
          nameVar.value,
          descriptionVar.value
        )
      }
      resetStates()
    }
    const addToShoppingList = async (listId) => {
      closeSidebar()
      if (isAddAllMode.value) {
        await shoppingListsStore.saveCartToShoppingList(listId)
        shoppingListsStore.toggleAddAllMode()
      } else {
        await shoppingListsStore.addToShoppingList(listId)
      }
      resetStates()
    }
    const handleForward = async () => {
      if (isBasicMode.value) {
        shoppingListsStore.addMode()
      } else {
        await newShoppingList()
      }
    }
    const forwardButtonText = computed(() => {
      if (isAddMode.value) {
        return i18n.t('myaccount.shoppingList.save')
      }
      if (isNewListMode.value) {
        return i18n.t('myaccount.shoppingList.save')
      }
      return i18n.t('myaccount.shoppingList.add')
    })

    const handleBack = () => {
      if (isAddMode.value) {
        shoppingListsStore.basicMode()
        resetStates()
      } else {
        closeSidebar()
        resetStates()
      }
    }

    return {
      shoppingLists,
      isAddMode,
      handleForward,
      handleBack,
      isOverlayOpen,
      closeSidebar,
      addToShoppingList,
      nameVar,
      descriptionVar,
      isNewListMode,
      isBasicMode,
      forwardButtonText,
      isInitialLoad,
      clickAway,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-overlay {
  .sidebar__panel-content {
    @apply tw-flex tw-flex-col;
  }

  .sidebar__panel-close {
    @apply tw-top-[21px];
    @apply tw-right-[21px];

    @screen md {
      @apply tw-top-[26px];
      @apply tw-right-6;
    }

    @screen lg {
      @apply tw-top-[37px];
      @apply tw-right-8;
    }
  }

  &__header {
    @apply tw-p-4;
    @apply tw-h-[60px];
    @apply tw-flex;

    @screen md {
      @apply tw-h-[68px];
      @apply tw-px-6;
      @apply tw-pt-6;
    }

    @screen lg {
      @apply tw-h-[84px];
      @apply tw-px-8;
      @apply tw-pt-8;
    }

    &--title {
      @apply tw-text-lg;
      @apply tw-leading-7;
      @apply tw-my-auto;

      @screen lg {
        @apply tw-text-2xl;
        @apply tw-leading-9;
      }
    }
  }

  &__loading {
    @apply tw-bg-pv-grey-96;
    @apply tw-h-full;
    @apply tw-w-full;
  }

  &__content {
    @apply tw-bg-pv-grey-96;
    @apply tw-h-full;
    @apply tw-w-full;
    @apply tw-flex tw-flex-col;
    @apply tw-overflow-y-auto;
    @apply tw-overflow-x-hidden;
    @apply tw-py-4;
    @apply tw-px-6;

    @screen lg {
      @apply tw-px-8;
    }

    .button--outlined {
      @apply tw-shadow-none;
      @apply tw-font-normal;
      @apply tw-text-pv-grey-16;
      @apply tw-mb-4;
      @apply tw-max-h-6;
      @apply tw-justify-start;

      .button__label {
        @apply tw-overflow-hidden;
      }
    }
  }

  &__content-empty {
    @apply tw-bg-pv-white;
    @apply tw-my-4;
    @apply tw-mx-8;
    @apply tw-p-6;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-items-center;
  }

  &__content-add {
    @apply tw-bg-pv-grey-96;
    @apply tw-h-full;
    @apply tw-overflow-y-auto;
    @apply tw-py-4;
    @apply tw-px-6;
    @apply tw-text-pv-grey-16;

    &--name {
      @apply tw-mt-4;
    }

    &--description {
      @apply tw-mt-4;

      textarea {
        @apply tw-h-[172px];

        @screen md {
          @apply tw-h-[376px];
        }
      }
    }

    &--inforamtion {
      @screen lg {
        @apply tw-text-base;
        @apply tw-leading-6;
      }
    }
  }

  &__footer {
    @apply tw-flex tw-flex-col;
    @apply tw-bg-pv-grey-96;
    @apply tw-p-4;
    @apply tw-h-36;

    @screen lg {
      @apply tw-flex-row-reverse;
      @apply tw-gap-4;
      @apply tw-h-28;
      @apply tw-p-8;
    }

    &--back {
      @apply tw-mt-4;

      @screen lg {
        @apply tw-mt-0;
        @apply tw-w-full;
      }
    }

    &--forward {
      @screen lg {
        @apply tw-w-full;
      }
    }
  }
}
</style>
