<template>
  <a v-if="isAnchorLink" v-bind="bindings" @click="beforeNavigation">
    <template v-if="label">{{ label }}</template>
    <slot v-else :isActive="false" :isExactActive="false" />
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
      <template v-if="label">{{ label }}</template>
      <slot v-else :isActive="isActive" :isExactActive="isExactActive" />
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
     * @values none, inline, breadcrumb, quicklink, textlink
     */
    variant: {
      type: String,
      default: 'none',
      validator: (val) =>
        ['none', 'inline', 'breadcrumb', 'quicklink', 'textlink'].includes(val),
    },
    /**
     * The label of the link. Optional, can be used instead of providing content for the template slot.
     */
    label: {
      type: String,
      default: '',
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
    @apply hover:tw-text-pv-red-lighter;
    @apply hover:tw-underline;
  }

  &--breadcrumb {
    @apply tw-text-pv-grey-16;
    @apply hover:tw-text-pv-red-lighter;
    @apply hover:tw-underline;
  }

  &--quicklink {
    @apply tw-font-bold;
    @apply tw-text-pv-grey-16;
    @apply hover:tw-text-pv-red-lighter;
  }

  &--textlink {
    @apply tw-transition-colors;
    @apply tw-duration-300;
    @apply tw-ease-out;
    @apply tw-leading-6;
    @apply hover:tw-underline;
  }
}
</style>
