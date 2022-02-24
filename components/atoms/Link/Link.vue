<template>
  <component :is="isAnchorLink ? 'a' : 'NuxtLink'" v-bind="bindings">
    <slot />
  </component>
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
    }))

    return {
      isAnchorLink,
      bindings,
    }
  },
})
</script>
