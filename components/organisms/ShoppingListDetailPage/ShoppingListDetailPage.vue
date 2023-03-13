<template>
  <div class="shopping-list-detail-page">
    <div class="shopping-list-detail-page__header">
      <ResultHeadline
        class="shopping-list-detail-page__header--headline"
        :headline="$t('myaccount.shoppingListOverviewPage.title')"
        :link="localePath('shop-my-account')"
      />
      <div class="shopping-list-detail-page__header--nav">
        <div class="shopping-list-detail-page__header--nav__edit">
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

        <Button
          class="shopping-list-detail-page__header--nav__select"
          :icon="isEditList ? 'edit' : 'close'"
          shape="outlined"
          gap="narrow"
          :label="
            isEditList
              ? $t('myaccount.editList')
              : $t('myaccount.shoppingListOverviewPage.discard')
          "
          variant="secondary"
          @click="toggleEditList"
        />
        <Button
          class="shopping-list-detail-page__header--nav__new"
          :icon="isEditList ? 'delete' : 'delete'"
          gap="narrow"
          :label="
            isEditList
              ? $t('myaccount.shoppingListOverviewPage.deleteList')
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
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'
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
    const isEditList = ref(false)
    const router = useRouter()
    const { app } = useContext()
    const toggleEditList = () => {
      isEditList.value = !isEditList.value
    }
    const goToShoppingListOverview = () => {
      router.push({
        path: app.localePath('shop-my-account'),
      })
    }
    return {
      nameVar,
      descriptionVar,
      isEditList,
      toggleEditList,
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
