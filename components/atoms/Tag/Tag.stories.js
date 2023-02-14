import defaultEntries from './Tag.stories.content'
import Tag from './Tag.vue'

export default {
  title: 'atoms/a_118 Tag',
  parameters: {
    docs: {
      description: {
        component:
          'The Tag component is used to display a tag with a background color.',
      },
      source: {
        code: '<Tag v-bind="{ label, content }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { Tag },
  setup() {
    return { args }
  },
  template: `
      <Tag v-bind="args" />
  `,
})

export const Default = Template.bind({})
Default.args = defaultEntries
