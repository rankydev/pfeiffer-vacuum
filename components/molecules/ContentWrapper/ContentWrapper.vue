<template>
  <div v-editable="content" class="content-wrapper">
    <nuxt-dynamic
      v-for="item in content.items"
      :key="item._uid"
      v-editable="true"
      :name="item.component"
      :content="item"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
})
</script>
