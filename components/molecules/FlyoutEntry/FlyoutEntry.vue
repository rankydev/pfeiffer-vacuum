<template>
  <component
    :is="hasLink ? 'Link' : 'div'"
    class="flyout-entry"
    v-bind="hasLink ? link : {}"
  >
    <icon class="flyout-entry__icon" :icon="icon" />
    <animated-collapse direction="horizontal" speed="fast">
      <div v-show="active" class="flyout-entry__label">{{ label }}</div>
    </animated-collapse>
  </component>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import Link from '~/components/atoms/Link/Link.vue'

export default defineComponent({
  components: {
    Icon,
    AnimatedCollapse,
    Link,
  },
  props: {
    /**
     * The label which will be shown on active
     */
    label: {
      type: String,
      required: true,
      default: 'Please specify a label',
    },
    /**
     * The icon to display
     * @see [Icon List] (https://fonts.google.com/icons?selected=Material+Icons)
     */
    icon: {
      type: String,
      required: true,
      default: 'question_mark',
    },
    /**
     * href of link
     */
    href: {
      type: String,
      default: undefined,
    },
    /**
     * target of link
     */
    target: {
      type: String,
      default: undefined,
    },
    /**
     * State if label will be shown or not
     */
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const hasLink = computed(() => props.href !== undefined)
    const link = {
      href: props.href,
      target: props.target,
    }

    return { hasLink, link }
  },
})
</script>

<style lang="scss">
.flyout-entry {
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
