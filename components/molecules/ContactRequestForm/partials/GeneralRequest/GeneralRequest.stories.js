import GeneralRequest from './GeneralRequest'

export default {
  title: 'Molecules/General Request',
  component: GeneralRequest,
  parameters: {
    docs: {
      description: {
        component: 'Hallo',
      },
      source: {
        code: '<GeneralRequesr v-bind="{}"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { GeneralRequest },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <GeneralRequest />
  </div>
`,
})

export const Default = Template.bind({})
