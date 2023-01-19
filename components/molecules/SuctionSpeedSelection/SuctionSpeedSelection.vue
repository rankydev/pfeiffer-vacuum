<template>
  <div class="suction-speed-selection">
    <ButtonGroup
      class="suction-speed-selection__button-group"
      selected-value="meters"
      :values="buttonGroupOptions"
      @update="
        unitChanged($event)
        applyFilter()
      "
    />
    <div class="suction-speed-selection__inputs">
      <PvInput
        v-model="lowerBound"
        class="suction-speed-selection__minimum"
        placeholder="0"
        input-type="number"
        :required="true"
      />

      <hr class="suction-speed-selection__divider-line" />

      <div class="suction-speed-selection__maximum">
        <PvInput
          v-model="upperBound"
          :placeholder="meters ? limitMeters : limitLiters"
          input-type="number"
          class="suction-speed-selection__maximum--selected-value"
          :required="true"
        />

        <div class="suction-speed-selection__maximum--selected-unit">
          {{ unit }}
        </div>
      </div>

      <Button
        class="suction-speed-selection__forward-button"
        icon="arrow_forward"
        variant="secondary"
        @click.native="
          applyFilter()
          sendUpdate()
        "
      ></Button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
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
      type: Array,
      default: () => ['0', '10000'],
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const meters = ref(true)
    const liters = ref(false)
    const unit = ref('m³/h')
    const limitMeters = '10.000'
    const limitLiters = '2778'
    const buttonGroupOptions = [
      {
        label: 'm³/h',
        value: 'meters',
      },
      {
        label: 'l/s',
        value: 'liters',
      },
    ]

    let lowerBound = ref(null)
    let upperBound = ref(null)
    const internalValue = ref([])

    const setIntitialModelValue = () => {
      const [first, second] = props.value
      const cleanValue = (value = '', op) => value?.replace(op, '')

      lowerBound.value = cleanValue(first || '0', '>=')
      upperBound.value = cleanValue(second || '10000', '<=')

      internalValue.value = [lowerBound, upperBound]
    }

    onBeforeMount(() => {
      setIntitialModelValue()
    })

    // limit the given value dependent on its unit (liters or meters)
    const fixMaxBounds = (val) => {
      if (meters.value && val > 10000) {
        val = 10000
      } else if (liters.value && val > 2778) {
        val = 2778
      }
      return val
    }

    const convertFromLitersPerSecondToCubicMetersPerHour = (lower, upper) => {
      lowerBound.value = fixMaxBounds(Math.round((lower * 36) / 10))
      upperBound.value = fixMaxBounds(Math.round((upper * 36) / 10))
    }

    const convertFromCubicMetersPerHourToLitersPerSecond = (lower, upper) => {
      lowerBound.value = Math.round((lower * 10) / 36)
      upperBound.value = Math.round((upper * 10) / 36)
    }

    const switchLitersPerSecondToCubicMetersPerHour = (
      tempLower,
      tempUpper
    ) => {
      meters.value = true
      liters.value = false
      convertFromLitersPerSecondToCubicMetersPerHour(tempLower, tempUpper)
      unit.value = 'm³/h'
    }

    const switchCubicMetersPerHourToLitersPerSecond = (
      tempLower,
      tempUpper
    ) => {
      meters.value = false
      liters.value = true
      convertFromCubicMetersPerHourToLitersPerSecond(tempLower, tempUpper)
      unit.value = 'l/s'
    }

    // when the unit changes, f.ex from liters to meters, the displayed value and unit are supposed to change
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
        switchCubicMetersPerHourToLitersPerSecond(tempLower, tempUpper)
      } else {
        switchLitersPerSecondToCubicMetersPerHour(tempLower, tempUpper)
      }
    }

    const fixMinBounds = (lower) => {
      if (lower < 0) {
        lower = 0
      }
      return lower
    }

    // after submitting the entered minimum and maximum values, the internalValue gets initialized using internally the unit cubic meters per hour, which can be used for filtering products
    const applyFilter = () => {
      if (!upperBound.value) {
        upperBound.value = 10000
      }

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

    const sendUpdate = () => {
      const lower = internalValue.value[0]
      const upper = internalValue.value[1]
      emit('update', [
        lower > 0 ? `>=${lower}` : null,
        upper < 10000 ? `<=${upper}` : null,
      ])
    }

    return {
      lowerBound,
      upperBound,
      unit,
      unitChanged,
      applyFilter,
      internalValue,
      meters,
      limitMeters,
      limitLiters,
      buttonGroupOptions,
      sendUpdate,
    }
  },
})
</script>

<style lang="scss">
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

      .pv-input__element {
        @apply tw-rounded-r-none;
      }
    }

    &--selected-unit {
      @apply tw-flex tw-items-center tw-justify-center;
      @apply tw-bg-pv-grey-80;
      @apply tw-w-full tw-h-full;
      @apply tw-text-base;
      @apply tw-rounded-r-md;
      @apply tw--ml-2;
    }
  }

  &__forward-button {
    flex-basis: auto;
  }
}
</style>
