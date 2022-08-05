import GenericModal from './GenericModal'
import { ref } from '@nuxtjs/composition-api'

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
    const isOpen = ref(args.isOpen)
    function toggleModal() {
      isOpen.value = !isOpen.value
    }
    return { args, toggleModal, isOpen }
  },
  template: `<div>
  <GenericModal :isOpen="isOpen" @closeModal="toggleModal">
    <h1>Hallo hier steht eine Komponente</h1>
    </GenericModal>
    <button @click="toggleModal">open Modal</button>
  </div>`,
})

export const Default = Template.bind({})
Default.args = {
  isOpen: false,
}
