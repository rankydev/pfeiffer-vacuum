<template>
  <div class="content-wrapper">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style lang="scss">
.content-wrapper {
  @apply tw-px-4;
  @apply tw-mx-auto;
  max-width: 1440px;

  @screen md {
    @apply tw-px-6;
  }

  @screen lg {
    @apply tw-px-8;
  }
}
</style>
