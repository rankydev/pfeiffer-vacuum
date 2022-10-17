<template>
  <div class="category-collapse">
    <div class="category-collapse__trigger">
      <NuxtLink class="category-collapse__parent" :to="href"
        >{{ `${label} (${count})` }}
      </NuxtLink>
      <Icon
        class="category-collapse__icon"
        :icon="isOpen ? 'expand_less' : 'expand_more'"
        @click="isOpen = !isOpen"
      />
    </div>
    <AnimatedCollapse speed="fast">
      <div v-show="isOpen" class="category-collapse__children">
        <NuxtLink
          v-for="category in children"
          :key="getKey(category.category.name)"
          class="category-collapse__child"
          :to="{
            path: joinURL(localePath('shop-categories'), category.category.id),
            query: { ...route.query, currentPage: 1 },
          }"
          >{{ `${category.category.name} (${category.productCount})` }}
        </NuxtLink>
      </div>
    </AnimatedCollapse>
  </div>
</template>
<script>
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse'
import Icon from '~/components/atoms/Icon/Icon'
import getKey from '~/composables/useUniqueKey'
import { joinURL } from 'ufo'
import { ref, useRoute } from '@nuxtjs/composition-api'

export default {
  components: {
    AnimatedCollapse,
    Icon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: [String, Object],
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    children: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const isOpen = ref(false)
    const route = useRoute()

    return { isOpen, getKey, joinURL, route }
  },
}
</script>
<style lang="scss">
.category-collapse {
  @apply tw-w-full;

  &__trigger {
    @apply tw-flex tw-items-center tw-justify-between;
  }

  &__parent,
  &__child {
    @apply tw-p-0;

    @apply tw-text-pv-grey-16;
    @apply tw-font-normal;
    @apply tw-overflow-hidden;
    @apply tw-text-ellipsis;

    &:hover {
      @apply tw-text-pv-red-lighter;
    }
  }

  &__parent {
    @apply tw-whitespace-nowrap;

    @screen lg {
      @apply tw-whitespace-normal;
    }
  }

  &__child {
    &:first-of-type {
      @apply tw-pt-6;
    }

    &:last-of-type {
      @apply tw-pb-2;
    }

    @apply tw-text-pv-grey-32;
  }

  &__icon {
    @apply tw-hidden;
    @apply tw-cursor-pointer;

    &:hover {
      @apply tw-text-pv-red-lighter;
    }

    @screen lg {
      @apply tw-inline-block;
    }
  }

  &__children {
    @apply tw-hidden;
    @apply tw-overflow-hidden;
    @apply tw-gap-4;

    @screen lg {
      @apply tw-flex tw-flex-col;
    }
  }
}
</style>
