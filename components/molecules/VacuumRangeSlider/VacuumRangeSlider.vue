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
      <template #label="{ value }">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="vue-slider-mark-label" v-html="getTooltipLabel(value)" />
      </template>
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
    <div v-if="showRanges" class="ranges">
      <div
        v-for="(range, index) in ranges"
        :key="index"
        class="range"
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
import { ref, onBeforeMount, useContext } from '@nuxtjs/composition-api'
import { sections, ranges } from './VacuumRangeSlider.json'

export default {
  name: 'VacuumRangeSlider',
  components: {
    VueSlider,
  },
  props: {
    showRanges: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update'],
  setup(_, { emit }) {
    const { i18n } = useContext()
    let modelValue = ref(['0', '16'])
    const marks = ref({})
    let data = ref([])

    onBeforeMount(() => {
      for (const section of sections.data) {
        marks.value[String(section.point)] = section.name
        data.value = data.value.concat(section.dataPoints)
      }
    })

    function getTooltipLabel(value) {
      return `${data.value[value]?.name} ${
        data.value[value]?.sup
          ? '<sup>' + data.value[value]?.sup + '</sup>'
          : ''
      } ${i18n.t(sections.unit)}`
    }

    function getRangeWidth(range) {
      const end = ranges[ranges.length - 1].end
      const perPoint = 100 / end
      const percentage = (range.end - range.start) * perPoint

      return `${percentage}%`
    }

    function selectionUpdated() {
      emit('update', [
        data.value[modelValue.value[0]].value,
        data.value[modelValue.value[1]].value,
      ])
    }

    function rangeClicked(start, end) {
      modelValue.value = [start, end]
      selectionUpdated()
    }

    return {
      modelValue,
      marks,
      data,
      sections,
      ranges,
      getRangeWidth,
      getTooltipLabel,
      selectionUpdated,
      rangeClicked,
    }
  },
}
</script>
<style src="vue-slider-component/dist-css/vue-slider-component.css"></style>
<style src="vue-slider-component/theme/default.css"></style>
<style lang="scss">
@import 'VacuumRangeSlider';
</style>
