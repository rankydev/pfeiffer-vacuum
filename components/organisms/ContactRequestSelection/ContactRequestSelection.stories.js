import ContactRequestSelection from '~/components/organisms/ContactRequestSelection/ContactRequestSelection.vue'
// import { subjectEntries } from '~/components/molecules/ContactRequestSubject/ContactRequestSubject.stories.content'

import {
  mainHeadline,
  selectionHeadline,
  text,
  requestSubjects,
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
  requestSubjects: requestSubjects,
}
