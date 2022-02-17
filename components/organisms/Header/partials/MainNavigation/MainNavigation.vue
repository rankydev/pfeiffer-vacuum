<template>
  <div class="main-navigation">
    <Icon icon="menu" class="main-navigation__trigger" />
    <div class="main-navigation__items">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="main-navigation__item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '~/components/atoms/Icon/Icon.vue'

const items = [
  'Produkte',
  'Märkte',
  'Knowledge',
  'Blog',
  'Service & Support',
  'Kontakt',
]
</script>

<style lang="scss">
.main-navigation {
  &__trigger {
    @apply tw-ml-3;
    @apply tw-block;
    @apply tw-text-pv-red;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__items {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }
  }

  /* temporarly until the component was implemented */
  &__item {
    @apply tw-mr-8;
    @apply tw-text-xl;
    @apply tw-leading-8;
    @apply tw-text-pv-grey-16;
  }

  /* temporarly until the component was implemented */
}
</style>
