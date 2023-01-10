<template>
  <div class="searchbutton">
    <button
      class="searchbutton__btn"
      @click="$emit('closeModal', true), pushSearchTerm(title)"
    >
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
  emits: ['click', 'closeModal'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const categoryStore = useCategoryStore()
    const { app } = useContext()
    const searchTerm = ref(route.value.query.searchTerm || '')

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
    @apply tw-p-3;
    @apply tw-rounded-md;

    &:hover,
    &:focus {
      @apply tw-bg-pv-grey-96;
      @apply tw-border-pv-white;

      .searchbutton__icon {
        @apply tw-flex;
      }
    }
  }

  &__icon {
    @apply tw-hidden;
  }

  &__title {
    @apply tw-text-sm;
    @apply tw-leading-6;
    @apply tw-font-normal;
  }
}
</style>
