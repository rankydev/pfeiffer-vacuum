import FilterTag from '~/components/atoms/FilterTag/FilterTag.vue'
import { filter, value } from './FilterTag.stories.content.js'

const argTypes = {
  filter: {
    control: { type: 'text' },
    defaultValue: filter,
  },
  value: {
    control: { type: 'text' },
    defaultValue: value,
  },
  isSuggestion: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
}

export default {
  title: 'Molecules/a_110 Filter-Tag',
  component: FilterTag,
  parameters: {
    docs: {
      description: {
        component:
          'The FilterTag component can be used within the facet selection. \n' +
          'It visualize the currently selected facets.',
      },
      source: {
        code: '<FilterTag v-bind="{ filter, value, isSuggestion }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { FilterTag },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <FilterTag v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
