import GeneralRequest from './GeneralRequest'

export default {
  title: 'Molecules/m_115 General Request',
  component: GeneralRequest,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a selectable type for the contact form subject component',
      },
      source: {
        code: '<GeneralRequest />',
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
