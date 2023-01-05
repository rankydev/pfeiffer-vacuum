<template>
  <div class="searchbutton">
    <button class="searchbutton__btn" @click="pushSearchTerm(title)">
      <p class="searchbutton__title">{{ title }}</p>
      <Icon class="searchbutton__icon" icon="arrow_forward" />
    </button>
  </div>
</template>

<script>
import {
  defineComponent,
  useRouter,
  useContext,
  useRoute,
  ref,
} from '@nuxtjs/composition-api'
import { useCategoryStore } from '~/stores/category/category'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    /**
     * The text displayed
     */
    title: {
      type: String,
      default: null,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()
    const { app } = useContext()
    const searchTerm = ref(route.value.query.searchTerm || '')
    console.log(searchTerm.value)

    const { blurSuggestions } = categoryStore

    const pushSearchTerm = (e) => {
      blurSuggestions(false)
      router.push({
        path: app.localePath('shop-categories'),
        query: { searchTerm: e.length ? e : undefined },
      })
    }
    return { pushSearchTerm, blurSuggestions }
  },
})
</script>

<style lang="scss">
.searchbutton {
  &__btn {
    @apply tw-flex;
    @apply tw-w-full;
    @apply tw-items-center;
    @apply tw-justify-between;
    @apply tw-mb-6 tw-p-3;
    @apply tw-rounded-md;

    &:hover,
    &:focus {
      @apply tw-bg-pv-grey-96;
    }
  }

  &__icon {
    @apply tw-hidden;

    &:hover,
    &:focus {
      @apply tw-flex;
    }
  }
}
</style>
