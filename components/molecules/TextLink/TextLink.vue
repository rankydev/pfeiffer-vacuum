<template>
  <div>
    <Link v-editable="label" class="text-link" v-bind="$attrs">
      <b>{{ label }}</b> ({{ $attrs.href }})
    </Link>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  components: { Link },
  props: {
    /**
     * The label of the link
     */
    label: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.text-link {
  @apply tw-transition-colors;
  @apply tw-duration-300;
  @apply tw-ease-out;
  @apply tw-leading-6;

  &:hover {
    @apply tw-underline;
  }
}
</style>
