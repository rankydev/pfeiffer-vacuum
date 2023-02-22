import KnowledgeCard from './KnowledgeCard'
import content from './KnowledgeCard.content.js'

export default {
  title: 'Test/KnowledgeCard',
  component: KnowledgeCard,
}

const Template = (args, { argTypes }) => ({
  components: { KnowledgeCard },
  props: Object.keys(argTypes),
  template: '<KnowledgeCard v-bind="$props" />',
})

export const Default = Template.bind({})
Default.args = { knowledge: content[1] }
