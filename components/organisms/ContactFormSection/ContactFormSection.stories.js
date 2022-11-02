import ContactFormSection from '~/components/organisms/ContactFormSection/ContactFormSection.vue'
import {
  requestForms,
  contactPersons,
} from './ContactFormSection.stories.content'
const argTypes = {}
export default {
  title: 'Organisms/o_116 ContactFormSection',
  component: ContactFormSection,
  parameters: {
    docs: {
      description: {
        component:
          'The contact form section is used to display the contact request options in a two-column view',
      },
      source: {
        code: `<ContactFormSection v-bind="{ contactPersons, requestForms }" />`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ContactFormSection },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactFormSection v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  requestForms,
  contactPersons,
}
