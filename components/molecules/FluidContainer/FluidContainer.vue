<template>
  <div class="fluid-container">
    <div class="fluid-container__items">
      <NuxtDynamic
        v-for="item in items"
        :key="item._uid"
        v-editable="true"
        :name="item.component"
        :content="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FluidContainer',
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
}
</script>

<style lang="scss">
.fluid-container {
  position: relative;

  &__items {
    display: block;
    position: absolute;
    width: 100vw;
    max-width: 2560px;
    height: fit-content;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
