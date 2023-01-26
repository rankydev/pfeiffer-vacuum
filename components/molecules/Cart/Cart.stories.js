import Cart from '~/components/molecules/Cart/Cart.vue'

export default {
  title: 'Molecules/m_142 Cart',
  component: Cart,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<Cart v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { Cart },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Cart />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
