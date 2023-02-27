import KnowledgeAuthorsList from './KnowledgeAuthorsList.vue'
import {
  isWhitepaper,
  authorcardlist,
} from '~/components/molecules/KnowledgeAuthorsList/KnowledgeAuthorsList.stories.content'

const argTypes = {
  isWhitepaper: {
    control: { type: 'boolean' },
    defaultValue: isWhitepaper,
  },
  authorcardlist: {
    control: { type: 'array' },
    defaultValue: authorcardlist,
  },
}

export default {
  title: 'Molecules/m_148 KnowledgeAuthorsList',
  component: KnowledgeAuthorsList,
  parameters: {
    docs: {
      description: {
        component:
          'The KnowledgeAuthorsList component is used to display a List auf athors',
      },
      source: {
        code: '<KnowledgeAuthorsList v-bind="args"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { KnowledgeAuthorsList },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
    <KnowledgeAuthorsList v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}

export const Whitepapers = Template.bind({})
Whitepapers.args = { isWhitepaper: true }
