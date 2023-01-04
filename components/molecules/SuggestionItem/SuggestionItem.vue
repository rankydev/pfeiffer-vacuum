<template>
  <div class="suggestion-element" @click="search(title)">
    <span>{{ title }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useCategoryStore } from '~/stores/category/category'

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const catgeoryStore = useCategoryStore()
    const search = (e) => {
      emit('submit')
      // router.push({
      //   path: app.localePath('shop-categories'),
      //   query: { searchTerm: e.length ? e : undefined },
      // })
    }
    return search
  },
})
</script>

<style lang="scss">
// .suggestion-element {
//   padding: 15px;

//   &:hover {
//     background-color: #f5f5f5;
//     cursor: pointer;
//   }

//   .sug-name,
//   .sug-price {
//     display: block;
//   }
// }
</style>
