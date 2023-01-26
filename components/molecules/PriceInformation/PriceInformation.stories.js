import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'

export default {
  title: 'Molecules/m_143 PriceInformation',
  component: PriceInformation,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<PriceInformation v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { PriceInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <PriceInformation />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
