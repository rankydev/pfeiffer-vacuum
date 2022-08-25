<template>
  <div class="suction-speed-selection">
    <ButtonGroup
      class="suction-speed-selection__button-group"
      initial-value="meters"
      :values="[
        {
          label: 'm³/h',
          value: 'meters',
        },
        {
          label: 'l/s',
          value: 'liters',
        },
      ]"
      @update="
        $emit('update')
        unitChanged($event)
        applyFilter()
      "
    />
    <div class="suction-speed-selection__inputs">
      <PvInput
        v-model="lowerBound"
        class="suction-speed-selection__minimum"
        placeholder="Min."
        :required="true"
        @update="
          lowerBound = $event
          $emit('update', lowerBound)
        "
      />

      <hr class="suction-speed-selection__divider-line" />

      <div class="suction-speed-selection__maximum">
        <PvInput
          v-model="upperBound"
          placeholder="Max."
          class="suction-speed-selection__maximum--selected-value"
          :required="true"
          @update="
            upperBound = $event
            $emit('update', lowerBound)
          "
        />

        <div class="suction-speed-selection__maximum--selected-unit">
          {{ unit }}
        </div>
      </div>

      <Button
        icon="arrow_forward"
        variant="secondary"
        @click.native="
          applyFilter()
          $emit('input', internalValue)
        "
      ></Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
  emits: [
    /**
     * Fired on keystroke.
     *
     * @event change
     * @property {string} value
     */
    'update',
    'input',
  ],
  setup() {
    const lowerBound = ref(0)
    const upperBound = ref(10000)
    const meters = ref(true)
    const liters = ref(false)
    const unit = ref('m³/h')
    const internalValue = ref()

    const fixMaxBounds = (val) => {
      if (meters.value && val > 10000) {
        val = 10000
      } else if (liters.value && val > 2778) {
        val = 2778
      }
      return val
    }

    const convertFromLitersToMeters = (lower, upper) => {
      lowerBound.value = fixMaxBounds(Math.round(lower * 3.6))
      upperBound.value = fixMaxBounds(Math.round(upper * 3.6))
    }

    const convertFromMetersToLiters = (lower, upper) => {
      lowerBound.value = Math.round(lower / 3.6)
      upperBound.value = Math.round(upper / 3.6)
    }

    const switchLitersToMeters = (tempLower, tempUpper) => {
      meters.value = true
      liters.value = false
      convertFromLitersToMeters(tempLower, tempUpper)
      unit.value = 'm³/h'
    }

    const switchMetersToLiters = (tempLower, tempUpper) => {
      meters.value = false
      liters.value = true
      convertFromMetersToLiters(tempLower, tempUpper)
      unit.value = 'l/s'
    }

    const unitChanged = () => {
      const tempLower =
        Number(upperBound.value) >= Number(lowerBound.value)
          ? Number(lowerBound.value)
          : Number(upperBound.value)
      const tempUpper =
        Number(upperBound.value) >= Number(lowerBound.value)
          ? Number(upperBound.value)
          : Number(lowerBound.value)

      if (meters.value) {
        switchMetersToLiters(tempLower, tempUpper)
      } else {
        switchLitersToMeters(tempLower, tempUpper)
      }
    }

    const fixMinBounds = (lower) => {
      if (lower < 0) {
        lower = 0
      }
      return lower
    }

    const applyFilter = () => {
      let lower = Number(lowerBound.value)
      let upper = Number(upperBound.value)

      // 10000 or 2776 are the upper limit (based on the selected unit)
      upper = fixMaxBounds(upper)

      // The absolute lowest possible value is 0
      lower = fixMinBounds(lower)

      // The lower value cannot possibly be higher than the upper limit, if they are we switch them out
      if (lower > upper) {
        const tmp = upper
        upper = lower
        lower = tmp
      }
      upperBound.value = upper
      lowerBound.value = lower

      // For the backend we need to calculate l/s back to m/s
      if (liters.value) {
        lower = Math.round((lower * 36) / 10)
        upper = Math.round((upper * 36) / 10)

        if (upper > 10000) {
          upper = 10000
        }
      }
      internalValue.value = [String(lower), String(upper)]
    }

    return {
      lowerBound,
      upperBound,
      unit,
      unitChanged,
      applyFilter,
      internalValue,
    }
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
    @apply tw-w-4;
    height: 2px;
    @apply tw-relative;
    @apply tw-text-pv-grey-16;
    @apply tw-bg-pv-black;
  }

  &__minimum {
    @apply tw-w-1/4;
  }

  &__maximum {
    @apply tw-flex;
    @apply tw-w-2/4;

    &--selected-value {
      @apply tw-w-full;
    }

    &--selected-unit {
      @apply tw-flex tw-items-center tw-justify-center;
      @apply tw-bg-pv-grey-80;
      @apply tw-w-full tw-h-full;
      @apply tw-text-base;
      border-bottom-right-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
      margin-left: -8px;
    }
  }
}
</style>
