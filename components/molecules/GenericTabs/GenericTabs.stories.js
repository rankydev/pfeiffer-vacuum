import GenericTabs from './GenericTabs'
import { ref } from '@nuxtjs/composition-api'

export default {
  title: 'Technical Components/ Generic Tabs',
  component: GenericTabs,
  parameters: {
    docs: {
      description: {
        component:
          'This generic tabs allows a maximum of flexibility by providing dynamic slot support.',
      },
      source: {
        code: `
<GenericTabs :tabs="tabs" :active-tab="activeTab" @selectTab="yourFunction">
  <template #activeTabContent>
    Your dynamic content dependent on "activeTab"
  </template>
</GenericTabs>
`,
      },
    },
  },
}

const Template = (args) => ({
  components: { GenericTabs },
  setup() {
    const activeTab = ref('products')
    const selectTab = (trigger) => {
      activeTab.value = trigger
    }

    return { args, activeTab, selectTab }
  },
  template: `
  <GenericTabs v-bind="args" :active-tab="activeTab" @selectTab="selectTab">
    <template #activeTabContent>
      <div v-if="activeTab === 'products'">your product content</div>
      <div v-if="activeTab === 'documents'">your document content</div>
    </template>
  </GenericTabs>
`,
})

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      name: 'Products',
      trigger: 'products',
      disabled: false,
    },
    {
      name: 'Documents',
      trigger: 'documents',
      disabled: false,
    },
    {
      name: 'Disabled Tab',
      trigger: 'disabled',
      disabled: true,
    },
  ],
}
