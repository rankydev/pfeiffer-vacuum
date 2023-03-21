<template>
  <div class="searchbutton">
    <button class="searchbutton__btn" @click="handleClickEvent">
      <p class="searchbutton__title">{{ title }}</p>
      <Icon class="searchbutton__icon" icon="arrow_forward" />
    </button>
  </div>
</template>

<script>
import { defineComponent, useRouter, useContext } from '@nuxtjs/composition-api'
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
      default: '',
    },
    searchType: {
      type: String,
      default: '',
    },
  },
  emits: ['click', 'closeModal'],
  setup(props, { emit }) {
    const router = useRouter()
    const categoryStore = useCategoryStore()
    const { localePath } = useContext()
    const { blurSuggestions } = categoryStore

    const pushSearchTerm = (e) => {
      blurSuggestions(false)

      router.push({
        path: localePath('shop-search'),
        query: {
          searchTerm: e?.length ? e : undefined,
          ...(props.searchType && { searchType: props.searchType }),
        },
      })
    }

    const handleClickEvent = () => {
      emit('closeModal', true)
      pushSearchTerm(props.title)
      emit('click', props.title)
    }

    return { handleClickEvent }
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

    &:focus {
      @apply tw-bg-pv-grey-96;
      @apply tw-border-pv-white;

      .searchbutton__icon {
        @apply tw-flex;
      }
    }

    @screen lg {
      &:hover,
      &:focus {
        @apply tw-bg-pv-grey-96;
        @apply tw-border-pv-white;

        .searchbutton__icon {
          @apply tw-flex;
        }
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
    @apply tw-text-left;
  }
}
</style>
