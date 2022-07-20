import ContactCTABox from './ContactCTABox'
import content from './ContactCTABox.stories.content'

const { headline, description, button } = content

export default {
  title: 'Molecules/m_120 Contact CTA Box',
  component: ContactCTABox,
  parameters: {
    docs: {
      description: {
        component:
          'The Contact CTA Box can provide a title and a description, as well as a button. This component is used e.g. on the contact page for the service subject as replacement for the form. The button can have a link.',
      },
      source: {
        code: '<ContactCTABox v-bind="{ headline, description, button }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContactCTABox },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactCTABox v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { headline, description, button }
