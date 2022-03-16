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
      default: () => true,
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
