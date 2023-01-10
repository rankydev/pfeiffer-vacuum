<template>
  <div
    class="tw-relative search-header"
    :class="{ 'search-header--opacity': hasOpacity }"
  >
    <Icon
      v-show="!isDesktop"
      icon="search"
      class="search-header__trigger"
      @click="toggleSearchfield"
    />
    <GenericModal
      class="search-header__modal"
      :is-open="isOpen"
      :fill-viewport="true"
      @closeModal="colseSearchfield"
    >
      <div class="search-header__modal-content">
        <h2 class="search-header__headline">
          {{ $t('category.search') }}
        </h2>
        <SearchInput @submit="colseSearchfield" />
        <div
          v-if="currentSuggestions.length"
          class="search-header__suggestions"
        >
          <h4 class="search-header__suggestions--headline">
            {{ `${$t('category.suggestions')}:` }}
          </h4>
          <SearchButton
            v-for="item in currentSuggestions"
            :key="item.value"
            class="search-header__suggestions--result"
            :title="item.value"
            @closeModal="colseSearchfield"
          />
        </div>
      </div>
    </GenericModal>
    <SearchInput class="search-header__field" />
    <div
      v-if="currentSuggestions.length"
      class="search-header__suggestions--desktop"
    >
      <SearchButton
        v-for="item in currentSuggestions"
        :key="item.value"
        class="search-header__suggestions--result"
        :title="item.value"
        @closeModal="colseSearchfield"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import SearchInput from '~/components/molecules/SearchInput/SearchInput.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import SearchButton from '~/components/molecules/SearchButton/SearchButton'
import { useCategoryStore } from '~/stores/category/category'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    SearchInput,
    Icon,
    GenericModal,
    SearchButton,
  },
  props: {
    hasOpacity: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { app } = useContext()
    const categoryStore = useCategoryStore()
    const isDesktop = app.$breakpoints.isDesktop
    const isOpen = ref(false)

    const { blurSuggestions } = categoryStore

    const { currentSuggestions } = storeToRefs(categoryStore)

    const toggleSearchfield = () => {
      isOpen.value = !isOpen.value
    }

    const colseSearchfield = () => {
      blurSuggestions(false)
      isOpen.value = false
    }

    return {
      isDesktop,
      toggleSearchfield,
      colseSearchfield,
      isOpen,
      currentSuggestions,
      blurSuggestions,
    }
  },
})
</script>

<style lang="scss">
.search-header {
  @apply tw-ease-linear;
  @apply tw-duration-100;
  transition-property: opacity;

  &--opacity {
    @apply tw-opacity-20;
  }

  &__trigger {
    @apply tw-ml-3;
    @apply tw-block;
    @apply tw-text-pv-red;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__headline {
    @apply tw-mb-4;
  }

  &__suggestions {
    &--headline {
      @apply tw-mt-12;
      @apply tw-mb-2;
    }
  }

  &__suggestions--desktop {
    box-shadow: 1px 5px 5px #a3a3a3;
    @apply tw-rounded-b-md;
    @apply tw-px-4;
    @apply tw-py-4;
    @apply tw-absolute;
    @apply tw-bg-pv-white;
    @apply tw-w-full;
    @apply tw-mt-14;
    @apply tw-z-10;
  }

  &__field {
    @apply tw-hidden;

    @screen md {
      @apply tw-grow;
      @apply tw-block;
    }
  }

  &__field--none {
    @apply tw-hidden;
  }

  &__modal-content {
    @apply tw-w-full;
    @apply tw-flex;
    @apply tw-flex-col;
  }
}
</style>
