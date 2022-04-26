<template>
  <ul class="breadcrumbs">
    <li
      v-for="(entry, idx) in entries"
      :key="idx"
      class="breadcrumbs__entry"
      :class="{ 'breadcrumbs__entry--last': isLastEntry(idx) }"
    >
      <Component
        :is="getComponent(idx)"
        :href="!isLastEntry(idx) && entry.href"
        :colored="!isLastEntry(idx) && 'breadcrumbs'"
        class="breadcrumbs__link"
        :class="{ 'breadcrumbs__link--last': isLastEntry(idx) }"
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
.breadcrumbs {
  @apply tw-flex;
  @apply tw-flex-row;
  @apply tw-gap-2;
  @apply tw-my-2;
  @apply tw-overflow-x-auto;
  @apply tw-whitespace-nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__entry {
    & + .breadcrumbs__entry::before {
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

    // &--last {
    // }
  }
}
</style>
