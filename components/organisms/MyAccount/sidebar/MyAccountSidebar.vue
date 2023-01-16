<template>
  <div class="myaccount-sidebar">
    <NuxtLink
      v-for="(item, index) in menuItems"
      :key="item.href"
      :to="item.href"
      class="myaccount-sidebar__item"
      :class="{ 'myaccount-sidebar__item--heading': index === 0 }"
    >
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        class="myaccount-sidebar__icon"
      />
      {{ item.label }}
    </NuxtLink>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useMyAccountStore } from '~/stores/myaccount'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    const myAccountStore = useMyAccountStore()
    const { menuItems } = storeToRefs(myAccountStore)

    return {
      menuItems,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-sidebar {
  @apply tw-flex;
  @apply tw-flex-col;

  &__icon {
    @apply tw-mr-2;
  }

  &__item {
    @apply tw-py-3.5;
    @apply tw-px-3.5;
    @apply tw-flex;

    &--heading {
      @apply tw-font-bold;
      @apply tw-text-xl;
    }

    &:hover {
      @apply tw-bg-pv-red-lighter;
      @apply tw-text-pv-white;
    }

    &.nuxt-link-exact-active {
      @apply tw-text-pv-red;

      &:hover {
        @apply tw-bg-pv-white;
      }
    }
  }
}
</style>
