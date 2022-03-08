<template>
  <div class="quicklink-navigation">
    <div>[Breadcrumb]</div>
    <div class="quicklink-navigation__items">
      <Quicklink
        v-for="item in quicklinks"
        :key="item._uid"
        :anchor="item.anchor"
      >
        {{ item.label }}
      </Quicklink>
      <span>[Shop]</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Quicklink from '@/components/atoms/Links/Quicklink/Quicklink'

export default defineComponent({
  components: {
    Quicklink,
  },
  props: {
    /**
     * Link array for quicklinks
     */
    quicklinks: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style lang="scss">
.quicklink-navigation {
  &,
  &__items {
    @apply tw-flex tw-items-center tw-justify-between tw-gap-6;
  }
}
</style>
