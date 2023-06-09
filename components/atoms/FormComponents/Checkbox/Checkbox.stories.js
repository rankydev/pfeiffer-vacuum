import Checkbox from './Checkbox'
import examples from './Checkbox.stories.content'
import { label } from './Checkbox.stories.content'

const argTypes = {
  label,
}

export default {
  title: 'Atoms/a_104 Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Form component used to display a checkbox with a label.<br> Please note, the checkbox has NO internal checked state. Parent component is responsible to pass correct "checked" prop. Use "update" event to handle checked state',
      },
      source: {
        code: '<Checkbox v-bind="{ label, checked, disabled }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { Checkbox },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
      <Checkbox v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  label,
  checked: false,
  disabled: false,
}

const OverviewTemplate = () => ({
  components: { Checkbox },
  setup() {
    return { examples }
  },
  template: `
  <div class="documentation-preview">
    <div v-for="(ele, index) in examples" :key="index">
      <Checkbox
        :key="'button-group-' + index"
        v-bind="{ ...ele }"
        style="margin:10px;"
      />
    </div>
  </div>
`,
})

export const Overview = OverviewTemplate.bind({})
