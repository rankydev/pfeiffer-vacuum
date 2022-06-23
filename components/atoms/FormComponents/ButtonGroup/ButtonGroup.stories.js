import ButtonGroup from './ButtonGroup'
import values from './ButtonGroup.stories.content'
import { examples } from './ButtonGroup.stories.content'

const argTypes = {
  values,
}

export default {
  title: 'Form components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Form component used to display a button group consisting of up to 5 values.',
      },
      code: '<ButtonGroup v-bind="{ values }"  />',
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { ButtonGroup },
  props: Object.keys(argTypes),
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

const OverviewTemplate = (args) => ({
  components: { ButtonGroup },
  setup() {
    return { examples }
  },
  template: `
  <div class="documentation-preview" style="max-width:500px;">
    <div v-for="(ele, index) in examples" :key="index">
      <ButtonGroup
        :key="'button-group-' + index"
        :values="ele"
        style="margin:10px;"
      />
    </div>
  </div>
`,
})

export const Overview = OverviewTemplate.bind({})
