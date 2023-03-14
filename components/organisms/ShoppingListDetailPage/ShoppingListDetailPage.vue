<template>
  <div class="shopping-list-detail-page">
    <div
      class="shopping-list-detail-page__header"
      :class="{ 'shopping-list-detail-page__header-active': isEditMode }"
    >
      <ResultHeadline
        class="shopping-list-detail-page__header--headline"
        :headline="$t('myaccount.shoppingListOverviewPage.title')"
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
          @click="toggleEditMode"
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
          @click="createDeleteLists"
        />
      </div>
    </div>
    <Button
      shape="plain"
      variant="secondary"
      class="shopping-list-detail-page__add-button"
      :label="$t('myaccount.addAllToCart')"
      icon="shopping_cart"
      gap="narrow"
      @click="goToShoppingListOverview"
    />
    <Button
      shape="plain"
      variant="secondary"
      class="shopping-list-detail-page__back-button"
      :label="$t('myaccount.backToOverview')"
      icon="arrow_back"
      :prepend-icon="true"
      gap="narrow"
      @click="goToShoppingListOverview"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  useContext,
  useRouter,
  ref,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline.vue'
import PvInput from '@/components/atoms/FormComponents/PvInput/PvInput.vue'
import PvTextArea from '@/components/atoms/FormComponents/PvTextArea/PvTextArea.vue'
export default defineComponent({
  name: 'ShoppingListOverviewPage',
  components: {
    PvInput,
    Button,
    ResultHeadline,
    PvTextArea,
  },
  setup() {
    const nameVar = ref('')
    const descriptionVar = ref('')
    const isEditMode = ref(false)
    const router = useRouter()
    const { app } = useContext()
    const toggleEditMode = () => {
      isEditMode.value = !isEditMode.value
    }
    const goToShoppingListOverview = () => {
      router.push({
        path: app.localePath('shop-my-account'),
      })
    }
    return {
      nameVar,
      descriptionVar,
      isEditMode,
      toggleEditMode,
      goToShoppingListOverview,
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
}
</style>
