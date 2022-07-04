import PvSelect from './PvSelect.vue'
import { normal, disabled, error, label } from './PvSelect.stories.content'

const argTypes = {
  error,
}

export default {
  title: 'Form components/PvSelect',
  component: PvSelect,
  parameters: {
    docs: {
      description: {
        component: 'Form component used to display a select.',
      },
      code: '<PvSelect v-bind="{ values }"  />',
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { PvSelect },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
    <PvSelect v-bind="args['Normal']" />
    <br/>
    <PvSelect v-bind="args['Disabled']" />
    <br/>
    <PvSelect v-bind="args['Error']" />
    <br/>
    <PvSelect v-bind="args['Label']" />
    <br/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  Normal: { ...normal },
  Disabled: { ...disabled },
  Error: { ...error },
  Label: { ...label },
}
