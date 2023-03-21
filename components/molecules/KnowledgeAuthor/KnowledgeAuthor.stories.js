import KnowledgeAuthor from './KnowledgeAuthor.vue'
import { authorName, title, image } from './KnowledgeAuthor.stories.content.js'
const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: image,
  },
}

export default {
  title: 'Molecules/m_147 KnowledgeAuthor',
  component: KnowledgeAuthor,
  parameters: {
    docs: {
      description: {
        component:
          'The KnowledgeAuthor component is used to display information about the author of a webinar or whitepaper',
      },
      source: {
        code: '<KnowledgeAuthor v-bind="args"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { KnowledgeAuthor },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
    <KnowledgeAuthor v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  image,
  authorName,
  title,
}
