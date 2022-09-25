import CategoryTree from './CategoryTree'
import categories from './CategoryTree.stories.content'

const argTypes = {
  categories,
}

export default {
  title: 'Molecules/m_123 Category Tree',
  component: CategoryTree,
  parameters: {
    docs: {
      description: {
        component:
          'The CategoryTree is used on the product listing page to navigate through categories. ' +
          'It has a vertical appearance on desktop and a horizontal on tablet/mobile.',
      },
      source: {
        code: '<category-tree v-bind="{ categories }"/>',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { CategoryTree },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview" style="max-width:500px;">
      <category-tree v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  categories,
}
