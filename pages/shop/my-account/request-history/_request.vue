<template>
  <div>
    <span>{{ requestId }}</span>
    <span>salami</span>
  </div>
</template>

<script>
import { defineComponent, useRoute, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const route = useRoute()

    const requestId = ref(route.value.params.request)

    return { requestId }
  },
})
</script>
