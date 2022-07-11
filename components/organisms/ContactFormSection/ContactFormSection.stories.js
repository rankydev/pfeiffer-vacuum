import ContactFormSection from '~/components/organisms/ContactFormSection/ContactFormSection.vue'
import {
  contactPersons,
  requestForms,
} from './ContactFormSection.stories.content.js'

const argTypes = {}
export default {
  title: 'Organisms/ContactFormSection',
  component: ContactFormSection,
  parameters: {
    docs: {
      description: {
        component:
          'The product card is a component which shows a product. The product is handed into the ContactFormSection by a parent component.',
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
  // ToDo: replace Accordion with content request subject array
  contactPersons: [
    {
      _uid: '35f17f46-a1c5-413e-a278-62ca514e1fd8',
      level: 'h3',
      multiple: false,
      component: 'Accordion',
      accordionEntries: contactPersons,
    },
  ],
  requestForms: [
    {
      _uid: '35f17f46-a1c5-413e-a278-62ca514e1fd8',
      level: 'h3',
      multiple: false,
      component: 'Accordion',
      accordionEntries: requestForms,
    },
  ],
}
