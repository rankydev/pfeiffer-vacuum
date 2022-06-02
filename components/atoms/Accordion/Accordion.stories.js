import Accordion from '~/components/atoms/Accordion/Accordion.vue'
import {
  accordionEntries,
  accordionEntriesWithImg,
  levels,
} from './Accordion.stories.content.js'

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
        component:
          'The Accordion component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one accordion element at a time; however, with the multiple property, the accordion element can remain open until explicitly closed.',
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

export const WithImg = Template.bind({})
WithImg.args = {
  accordionEntries: accordionEntriesWithImg,
}
