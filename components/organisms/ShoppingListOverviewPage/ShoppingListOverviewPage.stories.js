import ShoppingListOverviewPage from './ShoppingListOverviewPage.vue'
export default {
  title: 'ECOM Pages/ecom_1 ShoppingListOverviewPage',
  component: ShoppingListOverviewPage,
  parameters: {
    docs: {
      description: {
        component:
          'This component wraps the content of the shopping list overview page.',
      },
      source: {
        code: '<ShoppingListOverviewPage v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { ShoppingListOverviewPage },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ShoppingListOverviewPage v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
