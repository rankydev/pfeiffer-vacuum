<template>
  <div class="calculation-list-item">
    <div class="calculation-list-item__title">
      <span class="calculation-list-item__title--checkbox">
        <Checkbox
          v-if="selectMode"
          class="calculation-list-item__title--checkbox__input"
          :checked="selected"
          @update="toggleSelected"
        />
        <Icon icon="calculate" />
      </span>
      <span class="calculation-list-item__title--label" :title="item.title">
        {{ item.title }}
      </span>
    </div>
    <div class="calculation-list-item__date">
      {{ $d(new Date(item.insert.substring(0, 10)), 'date') }}
    </div>
    <div class="calculation-list-item__calculation-mode">
      {{ $t(`myaccount.calculations.modes.${item.calculationMode}`) }}
    </div>
    <div class="calculation-list-item__calculation-type">
      {{ $t(`myaccount.calculations.types.${item.calculationType}`) }}
    </div>
    <div class="calculation-list-item__buttons">
      <Button
        class="calculation-list-item__buttons--details"
        icon="arrow_forward"
        variant="secondary"
        gap="narrow"
        :shape="getShapeType"
        :href="item.calculationResult.link"
        :label="$t('myaccount.calculations.detailPageLink')"
        target="_blank"
      />
      <Button
        class="calculation-list-item__buttons--delete"
        icon="delete"
        shape="outlined"
        variant="secondary"
        @click="toggleInformationModal"
      />
    </div>
    <InformationModal
      :is-open="isInformationModalOpen"
      :headline="$t('myaccount.calculations.confirmationModal.headline')"
      :cancel-text="$t('myaccount.calculations.confirmationModal.cancel')"
      :confirm-text="$t('myaccount.calculations.confirmationModal.confirm')"
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
import InformationModal from '~/components/molecules/InformationModal/InformationModal.vue'

export default defineComponent({
  name: 'CalculationListItem',
  components: {
    Checkbox,
    Icon,
    Button,
    InformationModal,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    selectMode: {
      type: Boolean,
      default: false,
    },
    deselectAll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    const { app } = useContext()
    const selected = ref(false)
    const isInformationModalOpen = ref(false)
    const { item } = toRefs(props)
    const { isTablet, isDesktop } = app.$breakpoints
    const toggleSelected = () => {
      selected.value = !selected.value
      emit('update', { selected: selected.value, list: item.value })
    }

    const itemUrl = computed(() => {
      return app.localePath({
        name: 'shop-my-account-calculation-lists-list',
        params: {
          item: item.value.id,
        },
      })
    })

    const getShapeType = computed(() => {
      const isTabletOrMore = isTablet.value || isDesktop.value
      return isTabletOrMore ? 'plain' : 'outlined'
    })

    const toggleInformationModal = () => {
      isInformationModalOpen.value = !isInformationModalOpen.value
    }

    const acceptDelete = () => {
      toggleInformationModal()
      emit('delete', item.value)
    }

    watch(props, (newVal, oldVal) => {
      if (newVal?.selectMode !== oldVal?.selectMode) {
        selected.value = false
      }

      if (newVal.deselectAll) {
        selected.value = false
      }
    })

    return {
      selected,
      itemUrl,
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
.calculation-list-item {
  @apply tw-grid;
  @apply tw-auto-rows-auto;
  @apply tw-grid-cols-12;
  @apply tw-p-4;
  @apply tw-bg-pv-grey-96;
  @apply tw-text-pv-grey-16;

  @screen md {
    @apply tw-py-7;
  }

  &__title {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-1 tw-col-end-11;
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

    &--checkbox {
      @apply tw-hidden;

      @screen md {
        @apply tw-flex;
        @apply tw-my-auto;
      }

      &__input {
        @apply tw-mr-6;
      }
    }

    &--label {
      @apply tw-my-auto;
      @apply tw-break-all;

      @screen md {
        @apply tw-ml-2;
        @apply tw-max-w-full;
        @apply tw-truncate;
      }
    }
  }

  &__date {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-4 tw-col-end-11;
    @apply tw-text-sm;
    @apply tw-leading-7;

    // TODO: 80/20 better alignment of element on mobile
    &::before {
      content: '|';
      @apply tw-text-pv-red;
      @apply tw-mr-3;
      @apply tw-ml-2;
    }

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-4 tw-col-end-5;
      @apply tw-mt-4;
      @apply tw-my-auto;
      @apply tw-pl-6;

      &::before {
        content: none;
      }
    }

    @screen lg {
      @apply tw-text-base;
    }
  }

  &__calculation-mode {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-text-xs;
    @apply tw-leading-7;
    @apply tw-text-pv-grey-48;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-6 tw-col-end-9;
      @apply tw-text-pv-grey-16;
      @apply tw-my-auto;
      @apply tw-pl-6;
      @apply tw-text-sm;
    }

    @screen lg {
      @apply tw-text-base;
    }
  }

  &__calculation-type {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-text-sm;
    @apply tw-leading-7;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-9 tw-col-end-10;
      @apply tw-text-pv-grey-16;
      @apply tw-my-auto;
      @apply tw-pl-6;
      @apply tw-text-sm;
    }

    @screen lg {
      @apply tw-text-base;
    }
  }

  &__buttons {
    @apply tw-row-start-4 tw-row-end-5;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-mt-4;
    @apply tw-flex;

    @screen md {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-11 tw-col-end-12;
      @apply tw-my-auto;
      @apply tw-ml-auto;
    }

    &--details {
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

    &--delete {
      @apply tw-max-w-fit;

      @screen md {
        @apply tw-hidden;
      }
    }
  }
}
</style>
