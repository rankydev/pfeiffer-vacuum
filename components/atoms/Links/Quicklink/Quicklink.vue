<template>
  <Link class="quicklink tw-paragraph" :href="anchor">
    <slot />
  </Link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '@/components/atoms/Links/Link/Link'

export default defineComponent({
  components: {
    Link,
  },
  props: {
    anchor: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss">
.quicklink {
  @apply tw-font-bold;
  @apply hover:tw-text-pv-red-lighter;
}
</style>
