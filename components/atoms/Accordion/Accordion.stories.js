import Accordion from '~/components/atoms/Accordion/Accordion.vue'
import { accordionEntries, levels } from './Accordion.stories.content.js'

const argTypes = {
  accordionEntries: {
    defaultValue: accordionEntries,
    control: { type: 'array' },
  },
  level: {
    options: levels,
    control: { type: 'inline-radio' },
  },
}

export default {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<Accordion v-bind="{ accordionEntries, level }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { Accordion },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Accordion v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
