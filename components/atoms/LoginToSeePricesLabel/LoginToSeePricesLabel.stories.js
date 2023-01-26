import LoginToSeePricesLabel from '~/components/atoms/LoginToSeePricesLabel/LoginToSeePricesLabel.vue'

export default {
  title: 'Molecules/m_142 LoginToSeePricesLabel',
  component: LoginToSeePricesLabel,
  parameters: {
    docs: {
      description: {
        component:
          'This component is used as a label and login link in the AccesoriesCard, TotalNetInformation and ProductActions component',
      },
      source: {
        code: '<LoginToSeePricesLabel v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { LoginToSeePricesLabel },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <LoginToSeePricesLabel />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
