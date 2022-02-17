<template>
  <div class="search-input">
    <Icon icon="search" class="search-input__trigger" />
    <InputField
      icon="search"
      class="search-input__field"
      placeholder="Suche ..."
      @submit="() => alert('Enter hit')"
      @click:icon="() => alert('Icon clicked')"
    />
  </div>
</template>

<script setup>
import InputField from '~/components/atoms/Input/Input.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
</script>

<style lang="scss">
.search-input {
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
