<template>
  <div class="category-tree">
    <div class="category-tree__list">
      <CategoryCollapse
        v-for="(e, i) in categories"
        :key="i"
        :label="e.label"
        :count="e.count"
        :href="e.href"
        :children="e.children"
      />
    </div>
    <div class="category-tree__mobile-overlay"></div>
  </div>
</template>
<script>
import CategoryCollapse from './partials/CategoryCollapse'

export default {
  components: {
    CategoryCollapse,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.category-tree {
  @apply tw-relative;
  @apply tw-bg-pv-grey-96;

  @screen lg {
    @apply tw-bg-pv-transparent;
  }

  &__list {
    @apply tw-flex tw-flex-row;
    @apply tw-gap-4;
    @apply tw-pl-6 tw-pr-12 tw-py-4;
    @apply tw-overflow-y-auto;

    @screen lg {
      @apply tw-flex-col;
      @apply tw-p-0;
    }
  }

  &__mobile-overlay {
    @apply tw-inline-block;
    @apply tw-absolute;
    @apply tw-right-0 tw-top-0;
    @apply tw-h-full;
    @apply tw-w-16;
    background: linear-gradient(
      to right,
      rgb(245 245 245 / 0%) 0%,
      #f5f5f5 70%,
      #f5f5f5 100%
    );

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
