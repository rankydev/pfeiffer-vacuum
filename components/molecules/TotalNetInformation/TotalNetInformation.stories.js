import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation.vue'

export default {
  title: 'Molecules/m_141 TotalNetInformation',
  component: TotalNetInformation,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<TotalNetInformation v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { TotalNetInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TotalNetInformation />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
