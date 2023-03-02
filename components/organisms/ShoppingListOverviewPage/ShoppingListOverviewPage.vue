<template>
  <div class="shopping-list-overview-page">
    <div class="shopping-list-overview-page__header">
      <h1 class="shopping-list-overview-page__header--title">
        {{ $t('myaccount.shoppingListOverviewPage.title') }}
      </h1>
      <Button
        class="shopping-list-item__header--select"
        icon="list"
        shape="outlined"
        gap="narrow"
        :label="$t('myaccount.select')"
        variant="secondary"
      />
      <Button
        class="shopping-list-item__buttons--new"
        icon="add"
        shape="outlined"
        gap="narrow"
        :label="$t('myaccount.new')"
        variant="secondary"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'ShoppingListOverviewPage',
  components: {},
  props: {},
  setup() {
    return {}
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
        @apply tw-block;
        @apply tw-ml-auto;
      }
    }

    &--new {
      @apply tw-ml-auto;
      @apply tw-w-full;
    }
  }
}
</style>
