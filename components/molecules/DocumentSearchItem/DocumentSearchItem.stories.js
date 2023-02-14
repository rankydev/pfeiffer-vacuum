import DocumentSearchItem from './DocumentSearchItem.vue'
import { product } from './DocumentSearchItem.stories.content.js'

export default {
  title: 'Molecules/m_146 Document-Search-Item',
  component: DocumentSearchItem,
  parameters: {
    docs: {
      description: {
        component:
          'The Document Search Item component shows product documents that contain a download file. The product is handed into the DocumentSearchItem by a parent component',
      },
    },
  },
}

const Template = (args) => ({
  components: { DocumentSearchItem },
  setup() {
    return { args }
  },
  template: `
      <div class="documentation-preview" style="background-color: #F5F5F5; padding: 50px">
        <DocumentSearchItem v-bind="args" />
      </div>
    `,
})

export const Default = Template.bind({})

Default.args = { product }
