import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel.vue'

export default {
  title: 'Atoms/a_117 PromotionLabel',
  component: PromotionLabel,
  parameters: {
    docs: {
      description: {
        component:
          'This component is intended to display a certain discount next to the total price in the cart.',
      },
      source: {
        code: '<PromotionLabel v-bind="{ subline }" />',
      },
    },
  },
}

const Template = (args) => ({
  components: { PromotionLabel },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" >
    <PromotionLabel v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { subline: 'You get 20% discount on your entire shopping cart' }
