<template>
  <ul class="breadcrumb">
    <li
      v-for="(entry, idx) in entries"
      :key="idx"
      class="breadcrumb__entry"
      :class="{ 'breadcrumb__entry--last': isLastEntry(idx) }"
    >
      <Component
        :is="getComponent(idx)"
        :href="!isLastEntry(idx) && entry.href"
        :variant="!isLastEntry(idx) && 'breadcrumb'"
        class="breadcrumb__link"
        :class="{ 'breadcrumb__link--last': isLastEntry(idx) }"
      >
        {{ entry.name }}
      </Component>
    </li>
  </ul>
</template>

<script>
import { defineComponent, unref, computed } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link.vue'
import { useCmsStore } from '~/stores/cms'

export default defineComponent({
  components: {
    Link,
  },
  setup() {
    const cmsStore = useCmsStore()
    const entries = computed(() => cmsStore.breadcrumb)

    const isLastEntry = (idx) => unref(entries).length - 1 === idx
    const getComponent = (idx) => (isLastEntry(idx) ? 'span' : 'Link')

    return { entries, getComponent, isLastEntry }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

.breadcrumb {
  @include hide-scrollbar;

  @apply tw-flex;
  @apply tw-flex-row;
  @apply tw-gap-2;
  @apply tw-my-2;
  @apply tw-overflow-x-auto;
  @apply tw-whitespace-nowrap;
  @apply tw-text-xs;
  @apply tw-leading-6;

  &__entry {
    & + .breadcrumb__entry::before {
      @apply tw-mr-2;
      @apply tw-text-pv-red;
      content: '\00bb';
    }

    &--last {
      @apply tw-text-pv-grey-48;
    }
  }

  &__link {
    @apply tw-inline-block;
  }
}
</style>
