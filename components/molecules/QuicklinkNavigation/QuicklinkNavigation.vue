<template>
  <div class="quicklink-navigation">
    <Quicklink
      v-for="item in quicklinks"
      :key="item._uid"
      v-editable="item"
      :anchor="item.anchor"
    >
      {{ item.label }}
    </Quicklink>
    <Button size="small" label="Shop" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Quicklink from '~/components/molecules/Links/Quicklink/Quicklink'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  components: {
    Quicklink,
    Button,
  },
  props: {
    /**
     * Link array for quicklinks
     */
    quicklinks: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style lang="scss">
.quicklink-navigation {
  @apply tw-flex tw-items-center tw-justify-between tw-gap-6;
}
</style>
