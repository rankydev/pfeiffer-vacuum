<template>
  <a v-if="isExternalLink" v-bind="bindings" @click="beforeNavigation">
    <slot :isActive="false" :isExactActive="false">{{ label }}</slot>
  </a>

  <NuxtLink
    v-else
    v-slot="{ href: link, navigate, isActive, isExactActive }"
    v-bind="bindings"
    custom
  >
    <a
      :href="link"
      @click="
        ($event) => {
          beforeNavigation($event) && navigate($event)
        }
      "
    >
      <slot :isActive="isActive" :isExactActive="isExactActive"
        >{{ label }}
      </slot>
    </a>
  </NuxtLink>
</template>

<script>
import {
  defineComponent,
  computed,
  useRoute,
  unref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The relative or absolute link
     */
    href: {
      type: [String, Object],
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
     * a function which will be executed before click. It receives the click event as first parameter
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
    /**
     * An optional anchor which can be used instead of href. If the anchor doesn't exist
     * start with #, it will be added.
     */
    anchor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute()

    const isExternalLink = computed(() => {
      const isAnchor = !!props.anchor
      const isInternalLink = /^\/(\w+|$)/.test(props.href)
      return !(isAnchor || isInternalLink) || props.target !== '_self'
    })

    const anchor = computed(() => {
      if (!props.anchor) return null
      const { path } = unref(route)
      const hasHastag = props.anchor.startsWith('#')
      return `${path}${hasHastag ? '' : '#'}${props.anchor}`
    })

    const bindings = computed(() => ({
      ...(isExternalLink.value && {
        href: props.href,
      }),
      ...(isExternalLink.value && { target: props.target }),
      ...(!isExternalLink.value && { to: anchor.value || props.href }),
      class: `link--${props.variant}`,
    }))

    return {
      isExternalLink,
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
