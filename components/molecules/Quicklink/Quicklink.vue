<template>
  <Link class="quicklink tw-paragraph" :href="enrichedAnchor">
    <slot />
  </Link>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'

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
  setup(props) {
    const enrichedAnchor = computed(() => {
      return '#' + props.anchor
    })

    return {
      enrichedAnchor,
    }
  },
})
</script>

<style lang="scss">
.quicklink {
  @apply tw-font-bold;
  @apply hover:tw-text-pv-red-lighter;
}
</style>
