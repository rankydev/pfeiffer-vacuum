import ContentTextBlock from './ContentTextBlock.vue'
import { text } from './ContentTextBlock.stories.content.js'

export default {
  title: 'Organisms/ContentTextBlock',
  component: ContentTextBlock,
  parameters: {
    docs: {
      description: {
        component: 'The ContentTextBlock component is used to display a text.',
      },
      source: {
        code: '<ContentTextBlock v-bind="{ text }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContentTextBlock },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContentTextBlock v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { text }
