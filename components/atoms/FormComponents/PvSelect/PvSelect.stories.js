import { ref } from '@nuxtjs/composition-api'
import {
  disabled,
  disabledWithValue,
  error,
  icon,
  label,
  multiple,
  normal,
  optionIcon,
  withValue,
} from './PvSelect.stories.content'
import PvSelect from './PvSelect.vue'

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

const Template = (args, { argTypes: types }) => ({
  components: { PvSelect },
  props: Object.keys(types),
  setup() {
    const valueNormal = ref()
    const valueWithValue = ref('OptionValue 2')
    const valueIcon = ref()
    const valueOptionIcon = ref()
    const valueDisabled = ref('OptionValue 2')
    const valueDisabledWithValue = ref()
    const valueError = ref()
    const valueLabel = ref()

    return {
      args,
      valueNormal,
      valueWithValue,
      valueIcon,
      valueOptionIcon,
      valueDisabled,
      valueDisabledWithValue,
      valueError,
      valueLabel,
    }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
    <PvSelect v-bind="args['Normal']" v-model="valueNormal"/>
    <br/>
    <PvSelect v-bind="args['WithValue']" v-model="valueWithValue"/>
    <br/>
    <PvSelect v-bind="args['Icon']" v-model="valueIcon"/>
    <br/>
    <PvSelect v-bind="args['OptionIcon']" v-model="valueOptionIcon"/>
    <br/>
    <PvSelect v-bind="args['Disabled']" v-model="valueDisabled"/>
    <br/>
    <PvSelect v-bind="args['DisabledWithValue']" v-model="valueDisabledWithValue"/>
    <br/>
    <PvSelect v-bind="args['Error']" v-model="valueError"/>
    <br/>
    <PvSelect v-bind="args['Label']" v-model="valueLabel"/>
    <br/>
    </div>
  `,
})

export const Overview = Template.bind({})
Overview.args = {
  Normal: { ...normal },
  WithValue: { ...withValue },
  Icon: { ...icon },
  OptionIcon: { ...optionIcon },
  Disabled: { ...disabled },
  DisabledWithValue: { ...disabledWithValue },
  Error: { ...error },
  Label: { ...label },
}

const MultipleTemplate = (args, { argTypes: types }) => ({
  components: { PvSelect },
  props: Object.keys(types),
  setup() {
    const value = ref()

    return { args, value }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
      <PvSelect v-bind="args['Multiple']" v-model="value"/>
    </div>
  `,
})

export const Multiple = MultipleTemplate.bind({})
Multiple.args = {
  Multiple: { ...multiple },
}
Multiple.parameters = {
  docs: {
    description: {
      story:
        'The multiple option can be used to define a multiselect field. The dropdown options have a checkmark in front of them. <br/>' +
        'When a option is selected it will be displayed as red box in the select.',
    },
    source: {
      code: '<PvSelect v-bind="{ options }" multiple />',
    },
  },
}
