import DetailTabContent from './DetailTabContent'

const argTypes = {
  lastTabSelected: 'spareparts',
}

export default {
  title: 'Molecules/m_n.N. Detail Tab Content',
  component: DetailTabContent,
  parameters: {
    docs: {
      description: {
        component:
          'The DetailTabContent is used to display the content matching to the selected DetailTab. ',
      },
      source: {
        code: '<detail-tab-content :last-tab-selected="lastTabSelected" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { DetailTabContent },
  setup() {
    return { args }
  },
  template: `
    <div>
      <detail-tab-content v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  lastTabSelected: 'spareparts',
}
