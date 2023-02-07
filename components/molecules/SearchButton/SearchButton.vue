<template>
  <div class="searchbutton">
    <button class="searchbutton__btn" @click="handleClickEvent">
      <p class="searchbutton__title">{{ title }}</p>
      <Icon class="searchbutton__icon" icon="arrow_forward" />
    </button>
  </div>
</template>

<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useCategoryStore } from '~/stores/category/category'
import Icon from '~/components/atoms/Icon/Icon.vue'
import { storeToRefs } from 'pinia'

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
    const categoryStore = useCategoryStore()
    const { rootUrl } = storeToRefs(categoryStore)
    const { blurSuggestions } = categoryStore

    const pushSearchTerm = (e) => {
      blurSuggestions(false)
      router.push({
        path: rootUrl.value,
        query: { searchTerm: e.length ? e : undefined },
      })
    }

    const handleClickEvent = () => {
      emit('closeModal', true)
      pushSearchTerm(props.title)
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
  }
}
</style>
