import ButtonGroup from './ButtonGroup'
import values from './ButtonGroup.stories.content'
import { examples } from './ButtonGroup.stories.content'

const argTypes = {
  values,
}

export default {
  title: 'Atoms/a_104 Button Group',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Form component used to display a button group consisting of up to 5 values.',
      },
      source: {
        code: '<ButtonGroup v-bind="{ values }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { ButtonGroup },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
      <ButtonGroup v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  values,
}

const OverviewTemplate = () => ({
  components: { ButtonGroup },
  setup() {
    return {
      examples: [...examples, examples[3]],
    }
  },
  template: `
  <div class="documentation-preview" style="max-width:500px;">
    <div v-for="(ele, index) in examples" :key="index">
      <ButtonGroup
        :key="'button-group-' + index"
        :disabled="index === 4"
        :values="ele"
        style="margin:10px;"
      />
    </div>
  </div>
`,
})

export const Overview = OverviewTemplate.bind({})
