<template>
  <div>
    <template v-if="isMobile">
      <Button
        class="filter-modal__open-button"
        variant="secondary"
        :label="label"
        shape="outlined"
        icon="filter_list"
        @click="isOpen = true"
      ></Button>
      <GenericModal
        class="filter-modal"
        :is-open="isOpen"
        :fill-viewport="true"
        @closeModal="isOpen = false"
      >
        <div class="filter-modal__content">
          <h2 class="filter-modal__headline">
            {{ label }}
          </h2>
          <div class="filter-modal__slot">
            <slot />
          </div>
          <div>
            <Button
              class="filter-modal__apply-button"
              variant="secondary"
              :label="$t('category.applyFilter')"
              shape="filled"
              icon="filter_list"
              @click="isOpen = false"
            ></Button>
          </div>
        </div>
      </GenericModal>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script>
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import GenericModal from '~/components/molecules/GenericModal/GenericModal.vue'

export default defineComponent({
  components: {
    Button,
    GenericModal,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['closeModal'],
  setup() {
    const isOpen = ref(false)
    const { app } = useContext()
    const isMobile = app.$breakpoints.isMobile

    return { isOpen, isMobile }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

.filter-modal {
  &__open-button {
    @include fill-available;
    @apply tw-justify-center;
  }

  &__content {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-w-full;
  }

  &__headline {
    @apply tw-mb-4;
  }

  &__slot {
    @include hide-scrollbar;
    @apply tw-overflow-hidden;
    @apply tw-overflow-y-auto;
    @apply tw-h-full;
  }

  &__apply-button {
    @apply tw-mt-4;
    @include fill-available;
  }
}
</style>
