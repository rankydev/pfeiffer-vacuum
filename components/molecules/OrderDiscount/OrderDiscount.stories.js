import OrderDiscount from '~/components/molecules/OrderDiscount/OrderDiscount.vue'

export default {
  title: 'Molecules/m_142 OrderDiscount',
  component: OrderDiscount,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<OrderDiscount v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { OrderDiscount },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <OrderDiscount />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
