import DocumentSearchItem from './DocumentSearchItem.vue'

export default {
  title: 'Molecules/m_145 Document-Search-Item',
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
      <div class="documentation-preview">
        <DocumentSearchItem v-bind="args" />
      </div>
    `,
})

export const Default = Template.bind({})

Default.args = {
  product: {
    title: 'HiPace 300 with TC 400',
    id: 'esc_tree~project1_e~12~de',
    subtitle: ['Hipace 300', 'Deutsch', '12.12.2022'],
    body: `
    Betriebsanleitung Operating Instructions DE EN Original HiPace 300
    `,
    downloadLink:
      'resource/environment/project1_p/documents/pfeifferSharepointProd/12624-128864ODE_02.pdf',
  },
}
