import SearchResult from '~/components/molecules/SearchResult/SearchResult.vue'
import { products, pagination } from './SearchResult.stories.content.js'

export default {
  title: 'Molecules/m_xxx SearchResult',
  component: SearchResult,
  parameters: {
    docs: {
      description: {
        component: 'The category page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { SearchResult },
  setup() {},
  template: `
  <div class="documentation-preview">
    <SearchResult v-bind="{ products, pagination }" />
  </div>
`,
})

export const Default = Template.bind({
  products,
  pagination,
})
