<template>
  <div class="searchbutton">
    <button class="searchbutton__btn">
      <p class="searchbutton__title">{{ title }}</p>
      <Icon class="searchbutton__icon" icon="arrow_forward" />
    </button>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
  setup(props) {
    return {}
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
