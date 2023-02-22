import KnowledgeAuthor from './KnowledgeAuthor.vue'
import { name, title } from './KnowledgeAuthor.stories.content.js'
import { image } from '~/components/atoms/ResponsiveImage/ResponsiveImage.stories.content.js'

const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: image,
  },
}

export default {
  title: 'Molecules/m_??? KnowledgeAuthor',
  component: KnowledgeAuthor,
  parameters: {
    docs: {
      description: {
        component: 'The KnowledgeAuthor component is used to display ',
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
  name,
  title,
}
