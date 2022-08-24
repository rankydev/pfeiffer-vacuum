<template>
  <div class="suction-speed-selection">
    <ButtonGroup
      class="suction-speed-selection__button-group"
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
      "
    />
    <div class="suction-speed-selection__inputs">
      <PvInput
        v-model="lowerBound"
        class="suction-speed-selection__minimum"
        placeholder="Min."
        :required="true"
        @update="$emit('update')"
      />

      <hr class="suction-speed-selection__divider-line" />

      <div class="suction-speed-selection__maximum">
        <PvInput
          v-model="upperBound"
          placeholder="Max."
          class="suction-speed-selection__maximum--selected-value"
          :required="true"
          @update="$emit('update')"
        />

        <div class="suction-speed-selection__maximum--selected-unit">
          {{ unit }}
        </div>
      </div>

      <Button
        icon="arrow_forward"
        variant="secondary"
        @click.native="applyFilter()"
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
  props: {
    value: {
      type: null,
      required: true,
    },
  },
  emits: [
    /**
     * Fired on keystroke.
     *
     * @event change
     * @property {string} value
     */
    'update',
  ],
  setup() {
    const lowerBound = ref(0)
    const upperBound = ref(10000)
    const meters = ref(true)
    const liters = ref(false)
    const unit = ref('m³/h')

    const unitChanged = (e) => {
      console.log(e)
      if (e === 'meters') {
        meters.value = true
        liters.value = false
        unit.value = 'm³/h'
      } else {
        meters.value = false
        liters.value = true
        unit.value = 'l/s'
      }
    }

    const fixMaxBounds = (val) => {
      if (meters.value && val > 10000) {
        val = 10000
      } else if (liters.value && val > 2776) {
        val = 2776
      }

      return val
    }

    const applyFilter = () => {
      let lower = Number(lowerBound.value)
      let upper = Number(upperBound.value)

      // 10000 or 2776 are the upper limit (based on the selected unit)
      this.upper = fixMaxBounds(upper)

      // The absolute lowest possible value is 0
      if (lower < 0) {
        lower = 0
      }

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
        lower = Math.round(lower * 3.6)
        upper = Math.round(upper * 3.6)

        if (upper > 10000) {
          upper = 10000
        }
      }

      const internalValue = [String(lower), String(upper)]
      this.$emit('input', internalValue)
    }

    return { lowerBound, upperBound, unit, unitChanged, applyFilter }
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
    @apply tw-relative;
    height: 2px;
    @apply tw-bg-pv-black;
  }

  &__minimum {
    width: 25%;
  }

  &__maximum {
    @apply tw-flex;
    width: 50%;

    &--selected-value {
      width: 100%;
    }

    &--selected-unit {
      @apply tw-flex tw-items-center tw-justify-center;
      @apply tw-bg-pv-grey-80;
      width: 100%;
      height: 100%;
      @apply tw-text-base;
      border-bottom-right-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
      margin-left: -8px;
    }
  }
}
</style>
