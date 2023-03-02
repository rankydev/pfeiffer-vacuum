<template>
  <div class="shopping-list-overview-page">
    <div class="shopping-list-overview-page__header">
      <h1 class="shopping-list-overview-page__header--title">
        {{ $t('myaccount.shoppingListOverviewPage.title') }}
      </h1>
      <Button
        class="shopping-list-overview-page__header--select"
        icon="list"
        shape="outlined"
        gap="narrow"
        :label="$t('myaccount.select')"
        variant="secondary"
        @click="toggleSelectMode"
      />
      <Button
        class="shopping-list-item__buttons--new"
        icon="add"
        gap="narrow"
        :label="textBySizeNew"
        variant="secondary"
      />
    </div>
    <ShoppingListTabe
      class="shopping-list-overview-page__table"
      :lists="shoppingLists"
      :select-mode="isSelectMode"
    />
  </div>
</template>

<script>
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import { computed } from '@vue/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import ShoppingListTabe from '~/components/molecules/ShoppingListTable/ShoppingListTable.vue'
import { lists } from '~/components/molecules/ShoppingListTable/ShoppingListTable.stories.content'
export default defineComponent({
  name: 'ShoppingListOverviewPage',
  components: { Button, ShoppingListTabe },
  setup() {
    const { app, i18n } = useContext()
    const { isMobile } = app.$breakpoints
    const isSelectMode = ref(false)
    const shoppingLists = ref(lists)
    const toggleSelectMode = () => {
      isSelectMode.value = !isSelectMode.value
    }
    const textBySizeNew = computed(() => {
      return isMobile.value
        ? i18n.t('myaccount.newMobile')
        : i18n.t('myaccount.new')
    })

    return { textBySizeNew, toggleSelectMode, shoppingLists, isSelectMode }
  },
})
</script>

<style lang="scss">
.shopping-list-overview-page {
  &__header {
    @apply tw-flex;

    &--title {
      @apply tw-hidden;

      @screen lg {
        @apply tw-block;
      }
    }

    &--select {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
        @apply tw-ml-auto;
        @apply tw-mr-2;
      }
    }

    &--new {
      @apply tw-ml-auto;
      @apply tw-w-full;
    }
  }

  &__table {
    @apply tw-mt-4;

    @screen md {
      @apply tw-mt-6;
    }

    @screen lg {
      @apply tw-mt-[38px];
    }
  }
}
</style>
