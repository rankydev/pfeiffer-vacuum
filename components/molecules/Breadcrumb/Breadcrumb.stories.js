import Breadcrumb from './Breadcrumb'

export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      source: {
        code: '<Breadcrumb />',
      },
      description: {
        component:
          'The Breadcrum is a generic component which determines the values from the current route',
      },
    },
  },
}

const Template = () => ({
  components: { Breadcrumb },
  template: `
  <div class="documentation-preview">
    <Breadcrumb />
  </div>
`,
})

export const Default = Template.bind({})
