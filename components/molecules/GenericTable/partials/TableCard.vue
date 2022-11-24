<template>
  <div class="table-card">
    <span>{{ data.entries[primary].text || data.entries[primary] }}</span>
    <span>{{ data.entries[secondary].text || data.entries[secondary] }}</span>
    <pre>{{ 'Other: ' + normalValues }}</pre>
  </div>
</template>
<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        entries: [],
        actions: [],
      }),
    },
    primary: {
      type: Number,
      default: 0,
    },
    secondary: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const normalValues = computed(() =>
      props.data.entries.filter(
        (val, i) => ![props.primary, props.secondary].includes(i)
      )
    )

    return { normalValues }
  },
}
</script>
<style lang="scss">
.table-card {
  @apply tw-rounded-lg;
  @apply tw-bg-pv-grey-96;
  @apply tw-p-4;
}
</style>
