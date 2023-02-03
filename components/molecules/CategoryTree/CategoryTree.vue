<template>
  <div class="category-tree">
    <GenericHorizontalSlider>
      <div class="category-tree__list">
        <CategoryCollapse
          v-for="child in categories"
          :key="child.category.id"
          :label="child.category.name"
          :count="child.productCount"
          :href="getUrl(child.category.id)"
          :children="child.children"
        />
      </div>
    </GenericHorizontalSlider>
  </div>
</template>
<script>
import { defineComponent, ref, useRoute } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import CategoryCollapse from './partials/CategoryCollapse'
import GenericHorizontalSlider from '~/components/molecules/GenericHorizontalSlider/GenericHorizontalSlider.vue'
import { useCategoryStore } from '~/stores/category/category'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    CategoryCollapse,
    GenericHorizontalSlider,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const route = useRoute()
    const showScrollbar = ref(false)
    const categoryStore = useCategoryStore()
    const { rootUrl } = storeToRefs(categoryStore)

    const toggleScrollbarClass = () => {
      showScrollbar.value = !showScrollbar.value
    }

    const getUrl = (id) => ({
      path: joinURL(rootUrl.value, id),
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

  &__list {
    @apply tw-flex tw-flex-row;
    @apply tw-gap-4;
    @apply tw-pl-6 tw-pr-12 tw-py-4;

    @screen lg {
      @apply tw-flex-col;
      @apply tw-p-0;
    }
  }
}
</style>
