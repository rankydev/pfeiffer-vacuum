import Confirmation from './Confirmation'

export default {
  title: 'ECOM Pages/ecom_3 Confirmation',
  component: Confirmation,
  parameters: {
    docs: {
      description: {
        component:
          'This component is used to confirm that a certain user request has been processed successfully.',
      },
      source: {
        code: '<Confirmation v-bind="{ order }"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { Confirmation },
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
    <Confirmation v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  order: {
    code: '1234567890',
  },
}
