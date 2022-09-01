import PvSelect from './PvSelect.vue'
import {
  normal,
  withValue,
  icon,
  optionIcon,
  disabled,
  disabledWithValue,
  error,
  label,
  multiple,
} from './PvSelect.stories.content'

const argTypes = {
  error,
}

export default {
  title: 'Atoms/a_104 Select',
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
    <PvSelect v-bind="args['WithValue']" />
    <br/>
    <PvSelect v-bind="args['Icon']" />
    <br/>
    <PvSelect v-bind="args['OptionIcon']" />
    <br/>
    <PvSelect v-bind="args['Disabled']" />
    <br/>
    <PvSelect v-bind="args['DisabledWithValue']" />
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
  WithValue: { ...withValue },
  Icon: { ...icon },
  OptionIcon: { ...optionIcon },
  Disabled: { ...disabled },
  DisabledWithValue: { ...disabledWithValue },
  Error: { ...error },
  Label: { ...label },
}

const MultipleTemplate = (args, { argTypes }) => ({
  components: { PvSelect },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
      <PvSelect v-bind="args['Multiple']" />
    </div>
  `,
})

export const Multiple = MultipleTemplate.bind({})
Multiple.args = {
  Multiple: { ...multiple },
}
