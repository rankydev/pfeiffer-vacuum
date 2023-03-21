<template>
  <div
    :class="[
      'editable-textfield',
      { 'editable-textfield--editable': editable },
    ]"
  >
    <PvInput
      v-if="editable"
      v-model="inputValue"
      v-bind="{ label, disabled, ...validation }"
      @input="$emit('changed', $event)"
    />
    <div v-else class="editable-textfield__static">
      <div class="editable-textfield__text">
        <label v-if="label" class="editable-textfield__label">
          {{ label }}
        </label>
        <span class="editable-textfield__value">{{ value }}</span>
      </div>
      <Button v-if="button" v-bind="{ ...button }" />
    </div>
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import { ref } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'

export default {
  components: { PvInput, Button },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Object,
      default: null,
    },
    validation: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['changed'],
  setup(props) {
    const inputValue = ref(props.value)

    return { inputValue }
  },
}
</script>
<style lang="scss" scoped>
.editable-textfield {
  @apply tw-flex;
  @apply tw-bg-pv-grey-96;
  @apply tw-p-4;

  &--editable {
    @apply tw-bg-pv-transparent;
  }

  &__text {
    @apply tw-flex tw-flex-col;
    @apply tw-gap-1;
  }

  &__static {
    @apply tw-flex tw-justify-between;
    @apply tw-w-full;
  }

  &__label {
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
  }

  &__value {
    @apply tw-font-bold;
  }
}
</style>
