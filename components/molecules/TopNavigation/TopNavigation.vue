<template>
  <div class="top-navigation">
    <Flyout
      v-for="(ele, idx) in elements"
      :key="idx"
      :icon="ele.icon"
      :label="ele.label"
    />
    <LanguageSwitcher />
  </div>
</template>

<script setup>
import Flyout from '~/components/molecules/Flyout/Flyout.vue'
import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'

const elements = [
  { icon: 'work', label: 'Karriere' },
  { icon: 'business', label: 'Unternehmen' },
  { icon: 'group', label: 'Investor Relations' },
]
</script>

<style lang="scss">
.top-navigation {
  @apply tw-flex;
  @apply tw-items-center;
}
</style>
