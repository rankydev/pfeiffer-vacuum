<template>
  <div class="content-wrapper" v-editable="content">
    <NuxtDynamic
      v-for="item in content.items"
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
    content: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
}
</script>
