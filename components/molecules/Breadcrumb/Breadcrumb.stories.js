import Breadcrumb from './Breadcrumb'
import { entries } from './Breadcrumb.stories.content'
console.log(entries)
export default {
  title: 'Molecules/m_105 Breadcrumbs',
  component: Breadcrumb,
  parameters: {
    docs: {
      source: {
        code: '<Breadcrumb />',
      },
      description: {
        component:
          'The Breadcrumb is a generic component which determines the values from the current route. Storybook can not display a breadcrumb longer than a single entry, because he has only the iframe.hmtl route.',
      },
    },
  },
  argTypes: {
    entries: {
      options: entries,
      control: { type: 'array' },
    },
  },
}

const Template = (args) => ({
  components: { Breadcrumb },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Breadcrumb v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { entries }
