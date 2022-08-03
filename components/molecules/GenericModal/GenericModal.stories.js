import GenericModal from './GenericModal'

const argTypes = {
  isOpen: true,
}

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

const Template = (args) => ({
  components: { GenericModal },
  setup() {
    return { args }
  },
  template: `<div>
  <GenericModal v-bind="args">
    <h1>Hallo hier steht eine Komponente</h1>
    </GenericModal>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
}
