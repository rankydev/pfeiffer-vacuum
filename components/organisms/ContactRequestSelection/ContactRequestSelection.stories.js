import ContactRequestSelection from '~/components/organisms/ContactRequestSelection/ContactRequestSelection.vue'
import {
  mainHeadline,
  selectionHeadline,
  text,
  contactRequests,
} from './ContactRequestSelection.stories.content.js'

const argTypes = {}
export default {
  title: 'Organisms/ContactRequestSelection',
  component: ContactRequestSelection,
  parameters: {
    docs: {
      description: {
        component:
          'The product card is a component which shows a product. The product is handed into the ContactRequestSelection by a parent component.',
      },
      source: {
        code: `<ContactRequestSelection v-bind="{ product }" />`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ContactRequestSelection },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactRequestSelection v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  mainHeadline,
  selectionHeadline,
  text,
  // ToDo: replace Accordion with content request subject array
  contactRequests: [
    {
      _uid: '35f17f46-a1c5-413e-a278-62ca514e1fd8',
      level: 'h3',
      multiple: false,
      component: 'Accordion',
      accordionEntries: contactRequests,
    },
  ],
}
