import KnowledgeCard from './KnowledgeCard'
import content from './KnowledgeCard.stories.content.js'

const argTypes = {
  entry: {
    control: { type: 'object' },
    defaultValue: content,
  },
}
export default {
  title: 'Molecules/m_149 Knowledge Card',
  component: KnowledgeCard,
  parameters: {
    docs: {
      description: {
        component: 'Knowledge Card component used on the knowledge page.',
      },
      code: `<KnowledgeCard :entry="entry"/>`,
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { KnowledgeCard },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <KnowledgeCard v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}

export const Webinar = Template.bind({})
Webinar.args = {
  entry: {
    ...content,
    type: 'WEBINAR',
  },
}
