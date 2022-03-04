<template>
  <div class="search-header" :class="{ 'search-header--opacity': hasOpacity }">
    <icon icon="search" class="search-header__trigger" />
    <search-input class="search-header__field" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import SearchInput from '~/components/molecules/SearchInput/SearchInput.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    SearchInput,
    Icon,
  },
  props: {
    hasOpacity: {
      type: Boolean,
      default: false,
    },
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
}
</style>
