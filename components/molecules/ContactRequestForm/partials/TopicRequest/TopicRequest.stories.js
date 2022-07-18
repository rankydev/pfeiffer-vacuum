import TopicRequest from './TopicRequest'

export default {
  title: 'Molecules/m_115 Topic Request',
  component: TopicRequest,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a selectable type for the contact form subject component',
      },
      source: {
        code: '<TopicRequest />',
      },
    },
  },
}

const Template = (args) => ({
  components: { TopicRequest },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TopicRequest />
  </div>
`,
})

export const Default = Template.bind({})
