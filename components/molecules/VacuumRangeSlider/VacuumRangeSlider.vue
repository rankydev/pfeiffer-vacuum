<template>
  <div class="vacuum-range-slider">
    <VueSlider
      v-model="modelValue"
      v-bind="{ data, marks }"
      :enable-cross="true"
      :clickable="false"
      data-value="id"
      data-label="name"
      tooltip="always"
      @drag-end="selectionUpdated"
    >
      <!-- eslint-disable-next-line vue/no-template-shadow -->
      <template #label="{ value }">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="vue-slider-mark-label" v-html="getTooltipLabel(value)" />
      </template>
      <!-- eslint-disable-next-line vue/no-template-shadow -->
      <template #tooltip="{ value }">
        <div class="vue-slider-dot-tooltip-inner">
          <!-- eslint-disable vue/no-v-html -->
          <span
            class="vue-slider-dot-tooltip-text"
            v-html="getTooltipLabel(value)"
          />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </template>
    </VueSlider>
    <div v-if="showRanges" class="vacuum-range-slider__ranges">
      <div
        v-for="range in ranges"
        :key="range.name"
        class="vacuum-range-slider__range"
        :style="{ width: getRangeWidth(range) }"
        @click="rangeClicked(data[range.start].id, data[range.end].id)"
      >
        {{ $t(range.name) }}
      </div>
    </div>
  </div>
</template>
<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import {
  ref,
  onBeforeMount,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { sections, ranges } from './VacuumRangeSlider.json'

export default {
  name: 'VacuumRangeSlider',
  components: {
    VueSlider,
  },
  props: {
    initialValues: {
      type: Array,
      default: () => [],
    },
    showRanges: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update', 'input'],
  setup(props, { emit }) {
    const { i18n } = useContext()
    const marks = ref({})
    let data = ref([])

    const modelValue = ref(['0', '16'])

    const setIntitialModelValue = () => {
      const [first, second] = props.initialValues
      const cleanValue = (value = '', op) => value.replace(op, '')
      const findLower = ({ value }) => value === cleanValue(first, '>=')
      const findUpper = ({ value }) => value === cleanValue(second, '<=')
      const lower = data.value.findIndex(findLower)
      const upper = data.value.findIndex(findUpper)

      modelValue.value = [
        String(lower === -1 ? 0 : lower),
        String(upper === -1 ? 16 : upper),
      ]
    }

    onBeforeMount(() => {
      for (const section of sections.data) {
        marks.value[String(section.point)] = section.name
        data.value = data.value.concat(section.dataPoints)
      }

      setIntitialModelValue()
    })

    const getTooltipLabel = (value) => {
      const element = data.value[value]
      return `${element?.name} ${
        element?.sup ? '<sup>' + element?.sup + '</sup>' : ''
      } ${i18n.t(sections.unit)}`
    }

    const getRangeWidth = (range) => {
      const end = ranges[ranges.length - 1].end
      const perPoint = 100 / end
      const percentage = (range.end - range.start) * perPoint

      return `${percentage}%`
    }

    const selectionUpdated = () => {
      const lower = modelValue.value[0]
      const upper = modelValue.value[1]

      emit('update', [
        lower > 0 ? `>=${data.value[lower].value}` : null,
        upper < 16 ? `<=${data.value[upper].value}` : null,
      ])
    }

    const rangeClicked = (start, end) => {
      modelValue.value = [start, end]
      selectionUpdated()
    }

    return {
      modelValue,
      marks,
      data,
      sections,
      ranges,
      selectionUpdated,
      getRangeWidth,
      getTooltipLabel,
      rangeClicked,
    }
  },
}
</script>
<style lang="scss">
@import 'node_modules/vue-slider-component/dist-css/vue-slider-component.css';
@import 'node_modules/vue-slider-component/theme/default.css';
@import 'VacuumRangeSlider';
</style>
