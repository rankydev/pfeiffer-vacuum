<template>
  <div
    class="top-navigation"
    @mouseover="active = true"
    @mouseleave="active = false"
  >
    <div
      class="top-navigation__spacer"
      :class="`top-navigation__spacer--length-${elementCount}`"
    >
      <div class="top-navigation__flyout">
        <Flyout
          v-for="(ele, idx) in elements"
          :key="idx"
          :icon="ele.icon"
          :label="ele.label"
          :active="active"
        />
      </div>
    </div>
    <LanguageSwitcher />
  </div>
</template>

<script setup>
import { reactive, computed } from '@vue/composition-api'
import Flyout from '~/components/molecules/Flyout/Flyout.vue'
import LanguageSwitcher from '~/components/molecules/LanguageSwitcher/LanguageSwitcher.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])

const elements = reactive([
  { icon: 'work', label: 'Karriere' },
  { icon: 'business', label: 'Unternehmen' },
  { icon: 'group', label: 'Investor Relations' },
])

const active = computed({
  get: () => props.value,
  set: (value) => emit('input', value),
})

const elementCount = computed(() => {
  return elements.length < 4 ? elements.length : 4
})
</script>

<style lang="scss">
.top-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  &__spacer {
    @apply tw-relative;
    @apply tw-h-12;

    &--length-1 {
      @apply tw-w-12;
    }

    &--length-2 {
      @apply tw-w-24;
    }

    &--length-3 {
      @apply tw-w-36;
    }

    &--length-4 {
      @apply tw-w-48;
    }
  }

  &__flyout {
    @apply tw-flex;
    @apply tw-overflow-hidden;
    @apply tw-absolute;
    @apply tw-right-0;
    @apply tw-bg-pv-white;
    @apply tw-py-3;
    @apply tw-pl-3;
  }
}
</style>
