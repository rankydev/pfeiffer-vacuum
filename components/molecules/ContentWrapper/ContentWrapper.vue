<template>
  <div class="content-wrapper" v-editable="items">
    <NuxtDynamic
      v-for="item in items"
      :key="item._uid"
      v-editable="true"
      :name="item.component"
      :content="item"
    />
  </div>
</template>

<script>
export default {
  name: 'ContentWrapper',
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>
