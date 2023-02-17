import SearchInputPage from './SearchInputPage.vue'

export default {
  title: 'Document-Search-Suggest',
  component: SearchInputPage,
  parameters: {
    docs: {
      description: {
        component:
          'The Document Search Item component shows product documents that contain a download file. The product is handed into the DocumentSearchInput by a parent component',
      },
    },
  },
}

const Template = () => ({
  components: { SearchInputPage },
  template: `
      <div class="documentation-preview" style="background-color: #F5F5F5; padding: 50px">
        <SearchInputPage />
      </div>
    `,
})

export const Default = Template.bind({})
