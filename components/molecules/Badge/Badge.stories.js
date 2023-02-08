import defaultEntries from './Badge.stories.content'
import Badge from './Badge'

export default {
  title: 'Molecules/m_145 Badge',
  parameters: {
    docs: {
      description: {
        component:
          'The Badge component is used to display a label with a background color.',
      },
      source: {
        code: '<Badge v-bind="{ label, content }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { Badge },
  setup() {
    return { args }
  },
  template: `
      <Badge v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = defaultEntries
