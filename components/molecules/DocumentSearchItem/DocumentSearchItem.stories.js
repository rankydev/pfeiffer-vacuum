import DocumentSearchItem from '~/components/molecules/DocumentSearchItem/DocumentSearchItem.vue'

export default {
  title: 'Molecules/m_108 Document-Search-Item',
  component: ProductCard,
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
  name: 'HiPace 300 with TC 400',
  category: 'Hipace 300',
  language: 'Deutsch',
  date: '12.12.2022',
  description: `
    Betriebsanleitung Operating Instructions DE EN Original HiPace 300
  `,
  productUrl: 'google.com',
  downloadUrl: 'google.com',
}