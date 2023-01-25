import PromotionLabel from '~/components/atoms/PromotionLabel/PromotionLabel.vue'

const argTypes = {
  // slots
  subline: {
    control: { type: 'text' },
    defaultValue: 'You get 20% discount on your entire shopping cart',
    table: { type: { summary: null } },
  },
}

export default {
  title: 'Atoms/a_117 PromotionLabel',
  component: PromotionLabel,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: `<PromotionLabel v-bind="{}">
            <template v-slot:subline />
                </PromotionLabel>`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { PromotionLabel },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" >
    <PromotionLabel v-bind="args">
      <template v-if="'subline' in args" v-slot:subline>${args.subline}</template>
    </PromotionLabel>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
