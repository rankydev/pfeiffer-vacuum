<template>
  <div class="category-collapse">
    <div class="category-collapse__trigger">
      <Button
        class="category-collapse__parent"
        v-bind="{ href }"
        :label="`${label} (${count})`"
        variant="secondary"
        shape="plain"
      />
      <Icon
        class="category-collapse__icon"
        :icon="isOpen ? 'expand_less' : 'expand_more'"
        @click="isOpen = !isOpen"
      />
    </div>
    <AnimatedCollapse speed="fast">
      <div v-show="isOpen" class="category-collapse__children">
        <Button
          v-for="(category, i) in children"
          :key="i"
          :href="category.href"
          :label="`${category.category.name} (${category.count})`"
          class="category-collapse__child"
          variant="secondary"
          shape="plain"
        />
      </div>
    </AnimatedCollapse>
  </div>
</template>
<script>
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse'
import Button from '~/components/atoms/Button/Button'
import Icon from '~/components/atoms/Icon/Icon'
import { ref } from '@vue/composition-api'

export default {
  components: {
    AnimatedCollapse,
    Button,
    Icon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
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

    return { isOpen }
  },
}
</script>
<style lang="scss">
.category-collapse {
  &__trigger {
    @apply tw-flex tw-items-center tw-justify-between;
  }

  &__parent,
  &__child {
    @apply tw-p-0;

    .button__label {
      @apply tw-text-pv-grey-16;
      @apply tw-font-normal;
    }

    &:hover {
      .button__label {
        @apply tw-text-pv-red-lighter;
      }
    }
  }

  &__child {
    &:first-of-type {
      @apply tw-pt-6;
    }

    &:last-of-type {
      @apply tw-pb-2;
    }

    .button__label {
      @apply tw-text-pv-grey-32;
    }
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
