<template>
  <div class="search-header" :class="{ 'search-header--opacity': hasOpacity }">
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
      <div class="search-header__modal-content tw-flex tw-w-full">
        <h2 class="search-header__headline">Suche</h2>
        <SearchInput @submit="colseSearchfield" />
      </div>
    </GenericModal>
    <SearchInput class="search-header__field" />
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import SearchInput from '~/components/molecules/SearchInput/SearchInput.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'

export default defineComponent({
  components: {
    SearchInput,
    Icon,
    GenericModal,
  },
  props: {
    hasOpacity: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { app } = useContext()
    const isDesktop = app.$breakpoints.isDesktop
    const isOpen = ref(false)

    const toggleSearchfield = () => {
      isOpen.value = !isOpen.value
    }

    const colseSearchfield = () => {
      isOpen.value = false
    }

    return {
      isDesktop,
      toggleSearchfield,
      colseSearchfield,
      isOpen,
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
