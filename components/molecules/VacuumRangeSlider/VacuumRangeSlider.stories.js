import VacuumRangeSlider from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.vue'
import { ref } from '@nuxtjs/composition-api'

const argTypes = {}

export default {
  title: 'Molecules/m_128 Vacuum Range Slider',
  component: VacuumRangeSlider,
  parameters: {
    docs: {
      description: {
        component:
          'A vacuum range slider to filter for a certain vacuum ranges. This component is used in the facet filters on the PLP.',
      },
      source: {
        code: '<VacuumRangeSlider v-bind="{ showRanges }" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { VacuumRangeSlider },
  setup() {
    let result = ref([0, 10000])

    const initializeResult = (e) => {
      result.value = e
    }

    return { args, result, initializeResult }
  },
  template: `
  <div class="documentation-preview" style="padding:0 64px;">
    <VacuumRangeSlider v-bind="args" @update="initializeResult($event)" />
    <br />
    <div>Minimum in mbar: {{ result[0] }}</div>
    <div>Maximum in mbar: {{ result[1] }}</div>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { showRanges: true }
