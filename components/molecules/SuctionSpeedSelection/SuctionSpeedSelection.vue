<template>
  <div class="suction-speed-selection">
    <ButtonGroup
      class="suction-speed-selection__button-group"
      :values="[
        {
          label: 'm³/h',
          value: 1,
        },
        {
          label: 'l/s',
          value: 1,
        },
      ]"
    />
    <div class="suction-speed-selection__inputs">
      <PvInput placeholder="Min." :required="true" @update="$emit('update')" />

      <hr class="suction-speed-selection__divider-line" />

      <div class="suction-speed-selection__maximum">
        <PvInput
          placeholder="Max."
          class="suction-speed-selection__maximum--selected-value"
          :required="true"
          @update="$emit('update')"
        />

        <div class="suction-speed-selection__maximum--selected-unit">
          m<sup>3</sup>/h
        </div>
      </div>

      <Button icon="arrow_forward" variant="secondary"></Button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'SuctionSpeedSelection',
  components: {
    ButtonGroup,
    PvInput,
    Button,
  },
  props: {
    value: {
      type: null,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.suction-speed-selection {
  &__button-group {
    margin-bottom: 18px;
  }

  &__inputs {
    @apply tw-flex tw-gap-2 tw-justify-between;
  }

  &__divider-line {
    @apply tw-flex tw-self-center;
    @apply tw-text-pv-grey-16;
    @apply tw-w-4;
    height: 2px;
  }

  &__maximum {
    @apply tw-flex;
    width: 10rem;

    &--selected-value {
      flex-grow: 1;
    }

    &--selected-unit {
      @apply tw-flex tw-items-center tw-justify-center;
      flex-grow: 1;
      @apply tw-bg-pv-grey-80;
      width: 100%;
      height: 100%;
      @apply tw-text-base;
      border-bottom-right-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
    }
  }
}
</style>
