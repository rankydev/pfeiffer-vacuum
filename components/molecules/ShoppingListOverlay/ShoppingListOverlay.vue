<template>
  <GenericSidebar :is-open="open" position="right" @closeSidebar="closeOverlay">
    <div class="shopping-list-overlay__header">
      <h2 class="shopping-list-overlay__header--title">
        <span>{{ $t('myaccount.shoppingList.selectAList') }}</span>
        <span
          v-if="currentShoppingLists.length"
          class="shopping-list-overlay__header--title-count"
        >
          ({{ currentShoppingLists.length }})
        </span>
      </h2>
    </div>
    <div class="shopping-list-overlay__content">
      <Button
        v-for="{ name, id } in currentShoppingLists"
        :key="id"
        :label="name"
        icon="assignment"
        class="shopping-ist-overlay__content--item"
      />
      <div v-if="false" class="shopping-list-overlay__content-add">
        <p class="shopping-list-overlay__content-add">
          Fügen Sie Ihr Produkt zu einer neuen Liste hinzu.
        </p>
      </div>
    </div>
    <div class="shopping-list-overlay__footer">
      <Button
        class="shopping-list-overlay__footer--add"
        :label="$t('myaccount.shoppingList.add')"
        icon="add"
        shape="filled"
        variant="secondary"
      />
      <Button
        class="shopping-list-overlay__footer--back"
        :label="$t('myaccount.shoppingList.back')"
        icon="close"
        shape="outlined"
        variant="secondary"
      />
    </div>
  </GenericSidebar>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import GenericSidebar from '@/components/molecules/GenericSidebar/GenericSidebar.vue'
import { useShoppingLists } from '@/stores/shoppinglist'
import Button from '@/components/atoms/Button/Button.vue'

export default defineComponent({
  name: 'CartOverlay',
  components: {
    GenericSidebar,
    Button,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const open = ref(props.isOpen)
    const closeOverlay = () => {
      open.value = false
    }
    const { currentShoppingLists } = useShoppingLists()
    console.log(currentShoppingLists)

    return {
      closeOverlay,
      open,
      currentShoppingLists,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-overlay {
  &__header {
    @apply tw-px-4;
    @apply tw-pb-4;
    @apply tw-pt-3;
  }

  &__content {
    @apply tw-bg-pv-grey-96;
    @apply tw-h-full;
  }

  &__footer {
    @apply tw-flex tw-flex-col;
    @apply tw-p-4;
    @apply tw-h-[144px];

    &--back {
      @apply tw-mt-4;
    }
  }
}
</style>
