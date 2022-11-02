import ColumnView from './ColumnView.vue'
import {
  variants,
  column1,
  column2,
  column3,
} from './ColumnView.stories.content.js'

const argTypes = {}

const oneColumn = variants[0]
const twoColumn = variants[1]
const threeColumn = variants[2]

export default {
  title: 'Atoms/a_113 ColumnView',
  component: ColumnView,
  parameters: {
    docs: {
      description: {
        component:
          'The ColumnView component is used to display columns with content. It has 3 different variants: single item placed in the middle of the page (66), two columns placed next to each other (50:50) or three columns placed next to each other (33:33:33)',
      },
      source: {
        code: '<ColumnView v-bind="{ variant, column1, column2, column3 }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ColumnView },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ColumnView v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  variant: oneColumn,
  column1,
}
export const TwoColumn = Template.bind({})
TwoColumn.args = {
  variant: twoColumn,
  column1,
  column2,
}
export const ThreeColumn = Template.bind({})
ThreeColumn.args = {
  variant: threeColumn,
  column1,
  column2,
  column3,
}
