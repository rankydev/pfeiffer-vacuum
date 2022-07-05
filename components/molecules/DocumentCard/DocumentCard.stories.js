import DocumentCard from '~/components/molecules/DocumentCard/DocumentCard.vue'
import { image, href } from './DocumentCard.stories.content.js'

const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: image,
  },
}

export default {
  title: 'Molecules/Cards/DocumentCard',
  component: DocumentCard,
  parameters: {
    docs: {
      description: {
        component:
          'The DocumentCard component can be used within a carousel to display documents like brochures. \n' +
          'The aspect ratio of the card image is 21:28, as it is the default cover size of the brochures.',
      },
      source: {
        code: '<DocumentCard v-bind="{ image, href }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { DocumentCard },
  setup() {
    return { args }
  },
  template: `
  <div class="card-wrapper">
    <DocumentCard v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  href,
}
