import ContactRequestSelection from '~/components/organisms/ContactRequestSelection/ContactRequestSelection.vue'

import {
  mainHeadline,
  sectionHeadline,
  text,
  requestSubjects,
} from './ContactRequestSelection.stories.content.js'

const argTypes = {}
export default {
  title: 'Organisms/o_112 ContactRequestSelection',
  component: ContactRequestSelection,
  parameters: {
    docs: {
      description: {
        component:
          'The Contact Request Selection has a main headline, a section headline & text and also wraps the Contact Request Subjects in it.',
      },
      source: {
        code: `<ContactRequestSelection v-bind="{ mainHeadline, sectionHeadline, text, requestSubjects }" />`,
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
  sectionHeadline,
  text,
  requestSubjects: requestSubjects,
}
