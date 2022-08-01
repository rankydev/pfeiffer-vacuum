import GenericModal from './GenericModal'
import modalContent from './GenericModal.stories.content'

const argTypes = {}

export default {
  title: 'Technical components/Generic Modal',
  component: GenericModal,
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
  components: { GenericModal },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `<div>
  <GenericModal>
    <InformationModal v-bind="args" />
    </GenericModal>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {}
