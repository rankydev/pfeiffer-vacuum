import PvSelect from './PvSelect.vue'
import values from './PvSelect.stories.content'

const argTypes = {
  values,
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
      <PvSelect v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  ...values,
}
