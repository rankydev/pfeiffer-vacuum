import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection'

export default {
  title: 'Molecules/m_114 Category Page Size Selection',
  component: CategoryPageSizeSelection,
  parameters: {
    docs: {
      description: {
        component:
          'The CategoryPageSizeSelection can be used on the category page. It emits a change event, that outputs the value of the clicked button/ page size.',
      },
      source: {
        code: '<category-page-size-selection v-bind="{ active }" />',
      },
    },
  },
}

const Template = (args) => ({
  components: { CategoryPageSizeSelection },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CategoryPageSizeSelection v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { active: 9 }
