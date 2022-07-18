import TopicRequest from './TopicRequest'

export default {
  title: 'Molecules/Topic Request',
  component: TopicRequest,
  parameters: {
    docs: {
      description: {
        component: 'Hallo',
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
