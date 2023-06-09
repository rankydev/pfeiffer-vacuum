<template>
  <div :class="`myaccount-navigation-${variant}`">
    <div class="myaccount-navigation">
      <div class="myaccount-navigation__list">
        <NuxtLink
          v-for="(item, index) in menuItems"
          :key="index"
          :to="localePath(item.href)"
          class="myaccount-navigation__list-item"
          :class="`myaccount-navigation__list-item--${
            index === 0 ? 'heading' : 'subpage'
          }`"
          @click.native="linkClicked"
        >
          <Icon
            v-if="item.icon"
            :icon="item.icon"
            class="myaccount-navigation__icon"
          />
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useMyAccountStore } from '~/stores/myaccount'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  name: 'MyAccountNavigation',
  components: {
    Icon,
  },
  props: {
    /**
     * The navigation variant
     * @values flyout, sidebar, horizontal
     */
    variant: {
      type: String,
      default: 'sidebar',
      validator: (val) => ['flyout', 'sidebar', 'horizontal'].includes(val),
    },
  },
  emits: ['entry-clicked'],
  setup(_, { emit }) {
    const myAccountStore = useMyAccountStore()
    const { menuItems } = storeToRefs(myAccountStore)

    const linkClicked = ($el) => {
      emit('entry-clicked', $el)
    }

    return {
      menuItems,
      linkClicked,
    }
  },
})
</script>

<style lang="scss" scoped>
.myaccount-navigation-horizontal {
  .myaccount-navigation {
    @apply tw-relative;
    @apply tw-bg-pv-grey-96;

    &__icon {
      @apply tw-hidden;
    }

    &__list {
      @apply tw-flex tw-flex-row;
      @apply tw-px-4;
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

      &.nuxt-link-exact-active {
        @apply tw-text-pv-red;
      }
    }
  }
}

.myaccount-navigation-flyout,
.myaccount-navigation-sidebar {
  .myaccount-navigation {
    @apply tw-flex-col;
    @apply tw-mx-0;
    @apply tw-bg-pv-white;

    &__icon {
      @apply tw-mr-2;
    }

    &__list {
      @apply tw-flex tw-flex-col;
    }

    &__list-item {
      @apply tw-py-3.5;
      @apply tw-px-3.5;
      @apply tw-flex;
      @apply tw-transition-all;

      &:hover {
        @apply tw-bg-pv-red-lighter;
        @apply tw-text-pv-white;
      }

      @mixin active-item-styles() {
        @apply tw-text-pv-red;

        &:hover {
          @apply tw-text-pv-red;
          @apply tw-bg-pv-white;
        }
      }

      &--heading {
        @apply tw-font-bold;
        @apply tw-text-xl;
        @apply tw-block;

        &.nuxt-link-exact-active {
          @include active-item-styles;
        }
      }

      &--subpage {
        &.nuxt-link-active {
          @include active-item-styles;
        }
      }
    }
  }
}

.myaccount-navigation-flyout {
  .myaccount-navigation {
    &__list-item {
      &--heading {
        @apply tw-text-base;
        @apply tw-mt-3;
      }
    }
  }
}
</style>
