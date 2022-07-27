import ContactRequestSubject from './ContactRequestSubject'
import {
  subjectCTA,
  subjectForm,
} from './ContactRequestSubject.stories.content'

export default {
  title: 'Molecules/m_115 Contact Request Subject',
  component: ContactRequestSubject,
  parameters: {
    docs: {
      description: {
        component:
          'The ContactRequestSubject component is used in the ContactRequestSelection component. This entry should allow the user to choose a subject for the contact request.',
      },
      source: {
        code: '<ContactRequestSubject v-bind="{ title, description, type }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContactRequestSubject },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactRequestSubject v-bind="args" />
  </div>
`,
})

export const CTA = Template.bind({})
CTA.args = subjectCTA

export const Form = Template.bind({})
Form.args = subjectForm
