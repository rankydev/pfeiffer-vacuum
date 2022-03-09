<template>
  <div class="quicklink-navigation">
    <!-- TODO: Implement breadcrumb -->
    <div>[Breadcrumb]</div>
    <div class="quicklink-navigation__items">
      <Quicklink
        v-for="item in quicklinks"
        :key="item._uid"
        :anchor="item.anchor"
      >
        {{ item.label }}
      </Quicklink>
      <Button size="small" label="Shop" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Quicklink from '~/components/molecules/Links/Quicklink/Quicklink'

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
  @apply tw-container;

  &,
  &__items {
    @apply tw-flex tw-items-center tw-justify-between tw-gap-6;
  }
}
</style>
