<template>
  <a v-if="isAnchorLink" v-bind="bindings" @click="beforeNavigation">
    <slot :isActive="false" :isExactActive="false" />
  </a>

  <NuxtLink
    v-else
    v-slot="{ href: link, navigate, isActive, isExactActive }"
    v-bind="bindings"
    custom
  >
    <a
      :href="link"
      @click="($event) => beforeNavigation($event) && navigate($event)"
    >
      <slot :isActive="isActive" :isExactActive="isExactActive" />
    </a>
  </NuxtLink>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The relative or absolute link
     */
    href: {
      type: String,
      required: true,
      default: '#',
    },
    /**
     * The target of the link
     * @values _self, _blank
     */
    target: {
      type: String,
      default: '_self',
      validator: (val) => ['_self', '_blank'].includes(val),
    },
    /**
     * a function which will be executed before click. It receives the click event as first paramter
     */
    beforeNavigation: {
      type: Function,
      default: /* istanbul ignore next */ () => true,
    },
    /**
     * variant defines if any style should be applied to the link itself
     * @values none, inline, breadcrumb
     */
    variant: {
      type: String,
      default: 'none',
      validator: (val) => ['none', 'inline', 'breadcrumb'].includes(val),
    },
  },
  setup(props) {
    const isAnchorLink = computed(() => {
      const isInternalLink = /^\/(\w+|$)/.test(props.href)
      return !isInternalLink || props.target !== '_self'
    })

    const bindings = computed(() => ({
      ...(isAnchorLink.value && { href: props.href }),
      ...(isAnchorLink.value && { target: props.target }),
      ...(!isAnchorLink.value && { to: props.href }),
      class: `link--${props.variant}`,
    }))

    return {
      isAnchorLink,
      bindings,
    }
  },
})
</script>

<style lang="scss">
.link {
  &--inline {
    @apply tw-text-pv-red;

    &:hover {
      @apply tw-underline;
    }
  }

  &--breadcrumb {
    @apply tw-text-pv-grey-16;

    &:hover {
      @apply tw-text-pv-red-lighter;
      @apply tw-underline;
    }
  }
}
</style>
