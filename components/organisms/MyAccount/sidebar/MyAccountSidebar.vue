<template>
  <div class="myaccount-sidebar">
    <div
      class="myaccount-sidebar__list"
      :class="{
        'myaccount-sidebar__list--show-scrollbar': showScrollbar,
      }"
      @touchstart="toggleScrollbarClass(true)"
      @touchend="toggleScrollbarClass(false)"
    >
      <NuxtLink
        v-for="(item, index) in menuItems"
        :key="item.href"
        :to="item.href"
        class="myaccount-sidebar__list-item"
        :class="{ 'myaccount-sidebar__list-item--heading': index === 0 }"
      >
        <Icon
          v-if="item.icon"
          :icon="item.icon"
          class="myaccount-sidebar__icon"
        />
        {{ item.label }}
      </NuxtLink>
    </div>
    <div class="myaccount-sidebar__mobile-overlay"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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

    const showScrollbar = ref(false)

    const toggleScrollbarClass = (bool) => {
      showScrollbar.value = bool
    }

    return {
      menuItems,
      toggleScrollbarClass,
      showScrollbar,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-sidebar {
  @apply tw-relative;
  @apply tw-bg-pv-grey-96;
  margin: 0 -16px;

  @screen lg {
    @apply tw-flex-col;
    @apply tw-mx-0;
  }

  &__icon {
    @apply tw-mr-2;
    @apply tw-hidden;

    @screen lg {
      @apply tw-block;
    }
  }

  &__list {
    @apply tw-flex tw-flex-row;
    @apply tw-overflow-y-scroll;

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

  &__list-item {
    @apply tw-py-3.5;
    @apply tw-px-3.5;
    @apply tw-flex;
    @apply tw-transition-all;
    @apply tw-whitespace-nowrap;

    &--heading {
      @apply tw-hidden;
    }

    @screen lg {
      @apply tw-whitespace-normal;

      &:hover {
        @apply tw-bg-pv-red-lighter;
        @apply tw-text-pv-white;
      }

      &--heading {
        @apply tw-font-bold;
        @apply tw-text-xl;
        @apply tw-block;
      }
    }

    &.nuxt-link-exact-active {
      @apply tw-text-pv-red;

      &:hover {
        @apply tw-bg-pv-white;
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
