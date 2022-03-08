<template>
  <div class="language-switcher">
    <Icon class="language-switcher__icon" icon="language" />
    <span class="language-switcher__label">DE</span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
})
</script>

<style lang="scss">
.language-switcher {
  @apply tw-flex;
  @apply tw-items-center;
  @apply tw-text-pv-grey-48;

  &__label {
    @apply tw-ml-2;
    @apply tw-text-xs;
    @apply tw-font-bold;
    @apply tw-leading-6;
    @apply tw-whitespace-nowrap;
  }
}
</style>
