import Facets from './Facets.vue'
import data from './Facets.stories.content'

export default {
  title: 'Molecules/m_125 Facets',
  component: Facets,
  parameters: {
    docs: {
      description: {
        component:
          'The facet component renders all multiselect facets, the vacuum range slider, the suction speed slider, sorting and the active filters. ' +
          'It is used on the search result page to filter for certain criterias.',
      },
    },
  },
}

const Template = (args) => ({
  components: { Facets },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Facets v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { ...data }
