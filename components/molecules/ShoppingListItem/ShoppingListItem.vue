<template>
  <div class="shopping-list-item">
    <div class="shopping-list-item__name">
      <span class="shopping-list-item__name__checkbox">
        <Checkbox
          v-if="selectMode"
          class="shopping-list-item__name__checkbox__input"
          :checked="selected"
          @update="toggleSelected"
        />
        <Icon icon="assignment" />
      </span>
      <span class="shopping-list-item__name__label" :title="list.name">
        {{ list.name }}
      </span>
    </div>
    <div class="shopping-list-item__last-edited">
      <span class="shopping-list-item__last-edited__label">
        {{ $t('myaccount.lastEdited') }}:
      </span>
      {{ $d(new Date(list.lastModified.substring(0, 10)), 'date') }}
    </div>
    <div class="shopping-list-item__item-count">
      {{
        (list.entries || []).length + ` ${$t('myaccount.shoppingList.items')}`
      }}
    </div>
    <div class="shopping-list-item__buttons">
      <Button
        class="shopping-list-item__buttons__details"
        icon="arrow_forward"
        variant="secondary"
        gap="narrow"
        :shape="getShapeType"
        :href="listUrl"
        :label="$t('myaccount.shoppingList.details')"
      />
      <Button
        class="shopping-list-item__buttons__delete"
        icon="delete"
        variant="secondary"
        @click="toggleInformationModal"
      />
    </div>
    <InformationModal
      :is-open="isInformationModalOpen"
      :headline="$t('myaccount.shoppingList.confirmationModal.headline')"
      :cancel-text="$t('myaccount.shoppingList.confirmationModal.cancel')"
      :confirm-text="$t('myaccount.shoppingList.confirmationModal.confirm')"
      cancel-icon="close"
      confirm-icon="check"
      @confirm="acceptDelete"
      @cancel="toggleInformationModal"
      @closeModal="toggleInformationModal"
    />
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { ref, computed, watch, toRefs } from '@vue/composition-api'
import Checkbox from '~/components/atoms/FormComponents/Checkbox/Checkbox.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Button from '~/components/atoms/Button/Button.vue'
import { useToast } from '~/composables/useToast'

export default defineComponent({
  name: 'ShoppingListItem',
  components: {
    Checkbox,
    Icon,
    Button,
  },
  props: {
    list: {
      type: Object,
      required: true,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const toast = useToast()
    const selected = ref(false)
    const isInformationModalOpen = ref(false)
    const { list } = toRefs(props)
    const toggleSelected = () => {
      selected.value = !selected.value
      emit('update', { selected: selected.value, list: list.value })
    }

    const listUrl = computed(() => {
      return app.localePath({
        name: 'shop-my-account-shopping-lists-list',
        params: {
          list: list.value.id,
        },
      })
    })

    const getShapeType = computed(() => {
      const isTabletOrMore =
        app.$breakpoints.isTablet.value || app.$breakpoints.isDesktop.value
      return isTabletOrMore ? 'plain' : 'outlined'
    })

    const toggleInformationModal = () => {
      isInformationModalOpen.value = !isInformationModalOpen.value
    }

    const acceptDelete = () => {
      toggleInformationModal()
      toast.success(
        {
          description: i18n.t(
            'myaccount.shoppingList.confirmationModal.deleteSuccess'
          ),
        },
        { timeout: 3000 }
      )
      emit('delete', list.value)
    }

    watch(props, (newVal, oldVal) => {
      if (newVal?.selectMode !== oldVal?.selectMode) {
        selected.value = false
      }
    })

    return {
      selected,
      listUrl,
      toggleSelected,
      getShapeType,
      isInformationModalOpen,
      acceptDelete,
      toggleInformationModal,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-item {
  @apply tw-grid;
  @apply tw-auto-rows-auto;
  @apply tw-grid-cols-12;
  @apply tw-p-4;
  @apply tw-bg-pv-grey-96;

  @screen md {
    @apply tw-py-7;
  }

  &__name {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-text-sm;
    @apply tw-font-bold;
    @apply tw-leading-7;
    @apply tw-flex;

    @screen md {
      @apply tw-col-start-1 tw-col-end-4;
      @apply tw-overflow-x-clip;
      @apply tw-w-full;
      @apply tw-my-auto;
    }

    &__checkbox {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
        @apply tw-my-auto;
      }

      &__input {
        @apply tw-mr-6;
      }
    }

    &__label {
      @apply tw-my-auto;

      @screen md {
        @apply tw-ml-2;
      }
    }
  }

  &__last-edited {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-mt-4;
    @apply tw-text-sm;
    @apply tw-leading-7;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-4 tw-col-end-6;
      @apply tw-my-auto;
      @apply tw-pl-6;
    }

    &__label {
      @screen md {
        @apply tw-hidden;
      }
    }
  }

  &__item-count {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-text-xs;
    @apply tw-leading-7;
    @apply tw-text-pv-grey-48;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-6 tw-col-end-8;
      @apply tw-text-pv-black;
      @apply tw-my-auto;
      @apply tw-pl-6;
    }
  }

  &__buttons {
    @apply tw-row-start-4 tw-row-end-5;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-mt-4;
    @apply tw-flex;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-8 tw-col-end-13;
      @apply tw-my-auto;
      @apply tw-ml-auto;
    }

    &__details {
      @apply tw-mr-4;

      a {
        @apply tw-w-full;
        @apply tw-flex;

        .material-icons {
          @apply tw-ml-auto;
          @apply tw-my-auto;

          @screen md {
            @apply tw-ml-5;
          }
        }
      }
    }

    &__delete {
      @apply tw-max-w-fit;

      @screen md {
        @apply tw-hidden;
      }
    }
  }
}
</style>
