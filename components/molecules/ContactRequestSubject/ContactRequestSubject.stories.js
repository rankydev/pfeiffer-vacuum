import ContactRequestSubject from './ContactRequestSubject'
import content from './ContactRequestSubject.stories.content'

const { title, description, type } = content

export default {
  title: 'Molecules/ContactRequestSubject',
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

export const Default = Template.bind({})
Default.args = { title, description, type }
