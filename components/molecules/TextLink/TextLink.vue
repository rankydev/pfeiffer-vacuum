<template>
  <div>
    <Link
      v-editable="label"
      class="text-link"
      v-bind="$attrs"
      variant="textlink"
    >
      {{ label }}
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
