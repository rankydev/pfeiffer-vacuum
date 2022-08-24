import ContentCTABox from './ContentCTABox'
import content from './ContentCTABox.stories.content'

const { headline, description, button } = content

export default {
  title: 'Molecules/m_120 Contact CTA Box',
  component: ContentCTABox,
  parameters: {
    docs: {
      description: {
        component:
          'The Contact CTA Box can provide a title and a description, as well as a button. This component is used e.g. on the contact page for the service subject as replacement for the form. The button can have a link.',
      },
      source: {
        code: '<ContentCTABox v-bind="{ headline, description, button }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContentCTABox },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContentCTABox v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { headline, description, button }
