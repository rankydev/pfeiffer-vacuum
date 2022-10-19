<template>
  <div class="category-tree">
    <div
      class="category-tree__list"
      :class="{
        'category-tree__list--show-scrollbar': showScrollbar,
      }"
      @touchstart="toggleScrollbarClass"
      @touchend="toggleScrollbarClass"
    >
      <CategoryCollapse
        v-for="child in categories"
        :key="child.category.id"
        :label="child.category.name"
        :count="child.productCount"
        :href="getUrl(child.category.id)"
        :children="child.children"
      />
    </div>
    <div class="category-tree__mobile-overlay"></div>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  useRoute,
  useContext,
} from '@nuxtjs/composition-api'
import CategoryCollapse from './partials/CategoryCollapse'
import { joinURL } from 'ufo'

export default defineComponent({
  components: {
    CategoryCollapse,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const route = useRoute()
    const { app } = useContext()
    const showScrollbar = ref(false)

    const toggleScrollbarClass = () => {
      showScrollbar.value = !showScrollbar.value
    }

    const getUrl = (id) => ({
      path: joinURL(app.localePath('shop-categories'), id),
      query: { ...route.value.query, currentPage: 1 },
    })

    return {
      toggleScrollbarClass,
      showScrollbar,
      getUrl,
    }
  },
})
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
    @apply tw-overflow-y-scroll;

    @screen lg {
      @apply tw-flex-col;
      @apply tw-p-0;
    }

    &::-webkit-scrollbar {
      @apply tw-bg-pv-grey-96;
      @apply tw-h-0.5;
    }

    &::-webkit-scrollbar-thumb {
      @apply tw-bg-pv-grey-96;
      @apply tw-rounded-t-sm;
    }

    &--show-scrollbar {
      &::-webkit-scrollbar-thumb {
        @apply tw-bg-pv-red;
      }
    }
  }

  &__mobile-overlay {
    @apply tw-inline-block;
    @apply tw-absolute;
    @apply tw-right-0 tw-top-0;
    @apply tw-h-full;
    @apply tw-w-8;
    @apply tw-bg-gradient-to-r tw-from-pv-transparent tw-via-pv-grey-96 tw-to-pv-grey-96;

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
