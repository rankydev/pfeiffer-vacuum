<template>
  <div class="vacuum-range-slider">
    <vue-slider
      v-model="modelValue"
      v-bind="{ data, marks }"
      :enable-cross="true"
      :lazy="true"
      data-value="id"
      data-label="name"
      tooltip="always"
    >
      <template #label="{ value }">
        <div class="vue-slider-mark-label" v-html="getTooltipLabel(value)" />
      </template>
      <template #tooltip="{ value }">
        <div
          class="vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-top"
        >
          <span
            class="vue-slider-dot-tooltip-text"
            v-html="getTooltipLabel(value)"
          />
        </div>
      </template>
    </vue-slider>
    <div v-if="showRanges" class="ranges">
      <div
        v-for="(range, index) in ranges"
        :key="index"
        class="range"
        :style="{ width: getRangeWidth(range) }"
      >
        {{ $t(range.name) }}
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, useContext } from '@nuxtjs/composition-api'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
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
  setup() {
    const { i18n } = useContext()
    const modelValue = ref(['0', '16'])
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

    return {
      modelValue,
      marks,
      data,
      sections,
      ranges,
      getRangeWidth,
      getTooltipLabel,
    }
  },
}
</script>
<style lang="scss">
@import 'VacuumRangeSlider';

.vacuum-range-slider {
  @apply tw-mt-10;
  @apply tw-w-4/5;
  margin-left: calc(100% - 92%);

  @screen md {
    width: 92%;
    margin-left: calc(100% - 97%);
  }

  .ranges {
    display: none;

    @screen md {
      display: block;
      margin-top: 40px;
    }

    .range {
      @apply tw-bg-pv-grey-96;
      @apply tw-text-pv-grey-48;
      display: inline-block;
      text-align: center;
      cursor: pointer;
      padding: 6px;
      border-right: 1px solid white;
      border-left: 1px solid white;
      font-size: 12px;

      &:hover {
        @apply tw-bg-pv-red;
        @apply tw-text-pv-white;
      }
    }
  }
}
</style>
