import KnowledgeAuthorsList from './KnowledgeAuthorsList.vue'
import {
  isWhitelist,
  authorcardlist,
} from '~/components/molecules/KnowledgeAuthorsList/KnowledgeAuthorsList.stories.content'

const argTypes = {
  isWhitelist: {
    control: { type: 'boolean' },
    defaultValue: isWhitelist,
  },
  authorcardlist: {
    control: { type: 'array' },
    defaultValue: authorcardlist,
  },
}

export default {
  title: 'Molecules/m_??? KnowledgeAuthorsList',
  component: KnowledgeAuthorsList,
  parameters: {
    docs: {
      description: {
        component: 'The KnowledgeAuthorsList component is used to display ',
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
