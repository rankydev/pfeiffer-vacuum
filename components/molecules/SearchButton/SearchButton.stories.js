import SearchButton from '~/components/molecules/SearchButton/SearchButton.vue'
import SearchButtonContent from './SearchButton.stories.content'

const argTypes = {
  title: 'Hipace',
  suggestionsArr: [{ title: 'Hipace' }, { title: 'Hicube' }, { title: 'Hz' }],
}

export default {
  title: 'Molecules/m_133 Search Button',
  component: SearchButton,
  parameters: {
    docs: {
      description: {
        component:
          'The SearchButton will display the suggestions and latest search results when something is typed into the search field',
      },
      source: {
        code: `<SearchButton v-bind="{ title }" />`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { SearchButton },
  setup() {
    return { args }
  },
  template: `
  <div>
    <SearchButton v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  title: SearchButtonContent.suggestionsArr[0].title,
}
