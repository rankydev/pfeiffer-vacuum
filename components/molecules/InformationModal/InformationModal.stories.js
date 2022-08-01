import InformationModal from './InformationModal'

const argTypes = {}

export default {
  title: 'Technical components/Information Modal',
  component: InformationModal,
  parameters: {
    docs: {
      description: {
        component: 'Generic modal component used for various modal modules',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { InformationModal },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `<div>
    <InformationModal v-bind="args" />
  </div>`,
})

export const Default = Template.bind({})
Default.args = {}
