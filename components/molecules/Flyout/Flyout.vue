<template>
  <div class="flyout">
    <Icon class="flyout__icon" :icon="icon" />
    <AnimatedCollapse direction="horizontal" speed="fast">
      <div v-show="active" class="flyout__label">{{ label }}</div>
    </AnimatedCollapse>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'

export default defineComponent({
  components: {
    Icon,
    AnimatedCollapse,
  },
  props: {
    label: {
      type: String,
      required: true,
      default: 'Label missing',
    },
    icon: {
      type: String,
      required: true,
      default: 'question_mark',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.flyout {
  @apply tw-flex;
  @apply tw-items-center;
  @apply tw-text-pv-grey-48;

  &__label {
    @apply tw-ml-2;
    @apply tw-text-xs;
    @apply tw-font-bold;
    @apply tw-leading-6;
    @apply tw-whitespace-nowrap;
  }
}
</style>
