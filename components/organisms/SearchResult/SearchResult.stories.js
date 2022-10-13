import SearchResult from '~/components/organisms/SearchResult/SearchResult.vue'
import {
  products,
  pagination,
  categoryTree,
  facetFilters,
  query,
  sortFilters,
} from './SearchResult.stories.content.js'

const argTypes = {}

export default {
  title: 'Organisms/o_116 SearchResult',
  component: SearchResult,
  parameters: {
    docs: {
      description: {
        component: 'The category page of the application',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { SearchResult },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <SearchResult v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  products,
  pagination,
  categories: categoryTree,
  facets: facetFilters,
  currentQuery: query,
  sorts: sortFilters,
}
