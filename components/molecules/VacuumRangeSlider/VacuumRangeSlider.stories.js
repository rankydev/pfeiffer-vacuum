import VacuumRangeSlider from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.vue'
import { showRanges } from '~/components/molecules/VacuumRangeSlider/VacuumRangeSlider.stories.content.js'

const argTypes = {}

export default {
  title: 'Molecules/m_128 Vacuum Range Slider',
  component: VacuumRangeSlider,
  parameters: {
    docs: {
      description: {
        component:
          'A range slider to select a range between two values on a scale of different values f.e. vacuum values in this case',
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
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <VacuumRangeSlider v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { showRanges }
