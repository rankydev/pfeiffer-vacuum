<template>
  <div class="input-wrapper">
    <div ref="input-slot" class="input-wrapper__slot" :on="onHandlers">
      <div v-if="hasLabel" class="input-wrapper__label">
        {{ $te(label) ? $t(label) : label }}
      </div>

      <slot />
    </div>

    <div class="pv-input__icon">
      <pv-icon v-if="icon" :on="onIconHandlers" :icon="icon" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import PvIcon from '../Icon/Icon.vue'

export default defineComponent({
  setup() {},
})
</script>
