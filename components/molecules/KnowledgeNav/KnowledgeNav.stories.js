import KnowledgeNav from './KnowledgeNav.vue'

const argTypes = {}

export default {
  title: 'Molecules/m_147 KnowledgeNav',
  component: KnowledgeNav,
  parameters: {
    docs: {
      description: {
        component:
          'The KnowledgeNav component is used to display two links to the subcategories whitepapers and webinars',
      },
      source: {
        code: '<KnowledgeNav />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { KnowledgeNav },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <KnowledgeNav v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
